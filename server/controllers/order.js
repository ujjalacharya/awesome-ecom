const User = require("../models/User");
const Admin = require("../models/Admin")
const Payment = require("../models/Payment")
const Category = require("../models/Category")
const Product = require("../models/Product")
const ProductBrand = require("../models/ProductBrand")
const ProductImages = require("../models/ProductImages")
const Order = require("../models/Order")
const {calculateDistance} = require("../middleware/helpers")
const sharp = require("sharp")
const shortid = require('shortid');
const path = require("path");
const fs = require("fs");
const _ = require('lodash')
const Fawn = require("fawn");
const task = Fawn.Task();
const perPage = 10;

exports.order = async(req,res,next) => {
    const order = await Order.findById(req.params.order_id)
        .populate('user','-password -salt -resetPasswordLink -emailVerifyLink')
        .populate('payment','-user -order')
        .populate('product','_id slug name price discountRate category brand return isVerified isDeleted warranty')
        .populate('soldBy','name shopName address isVerified isBlocked holidayMode photo email adminWareHouse')
        .populate('adminWareHouse')
    if (!order) {
        return res.status(404).json({error:"Order not found"})
    }
    req.order = order
    next();
}

exports.calculateShippingCharge = async(req,res) => {
    const superadmin = await Admin.findOne({ role: 'superadmin' })
    if (!superadmin) {
        return res.status(404).json({ error: 'Cannot find shipping rate' })
    }
    const shippingRate = superadmin.shippingRate
    const systemGeoCoordinates = superadmin.geolocation.coordinates
    const userGeoCoordinates = req.user.geolocation.coordinates
    const distance = calculateDistance(
        systemGeoCoordinates[0],
        systemGeoCoordinates[1],
        userGeoCoordinates[0],
        userGeoCoordinates[1])
    let shippingCharge = distance * shippingRate
    shippingCharge = Math.round(shippingCharge)
    if (shippingCharge < 10) {
        return res.json(0)
    }
    let rem = shippingCharge % 10
    if (rem < 3) return res.json(shippingCharge - rem)
    if (rem < 7) return res.json(shippingCharge - rem + 5)
    if (rem >= 7) return res.json(shippingCharge + (10 - rem))
    
}


exports.createOrder = async (req, res) => {
    const product = await Product.findOne({ 
        slug: req.body.p_slug, 
        isVerified: { "$ne": null }, 
        isDeleted: null
    }).populate('soldBy','isBlocked isVerified')
    if (!product && product.soldBy.isBlocked && !product.soldBy.isVerified) {
        return res.status(404).json({ error: "Product not found." })
    }
    if (product.quantity === 0 ) {
        return res.status(403).json({error:"Product is out of the stock."})
    }
    if (product.quantity < req.body.quantity) {
        return res.status(403).json({error:`There are only ${product.quantity} products available.`})
    }

    // new order
    const newOrder = new Order()
    newOrder.user = req.user._id
    newOrder.product = product._id
    newOrder.soldBy = product.soldBy
    newOrder.quantity = req.body.quantity
    const status = {
        currentStatus: 'active',
        activeDate: Date.now()
    }
    newOrder.status = status

    // new payment
    const newPayent = new Payment({
        user: req.user._id,
        order: newOrder._id,
        method: req.body.method,
        shippingCharge: req.body.shippingCharge,
        transactionCode: shortid.generate(),
        amount: Math.round((product.price - (product.price * (product.discountRate / 100))) * newOrder.quantity),
        from: req.user.phone
    })
    newOrder.payment = newPayent._id

    //update product 
    const updateProduct = product.toObject()
    updateProduct.quantity = updateProduct.quantity - newOrder.quantity
    const results = await task
        .save(newOrder)
        .save(newPayent)
        .update(product,updateProduct)
        .options({viaSave:true})
        .run({ useMongoose: true })
    res.json({order:results[0],payment:results[1]})
}

exports.userOrders = async(req,res) => {
    const page = req.query.page || 1
    let orders = await Order.find({user:req.user._id})
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({error: "No orders found"})
    }
    res.json(orders)
}

exports.adminOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id })
        .populate('user', 'name address muncipality tole')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No orders found" })
    }
    res.json(orders)
}

exports.toggleOrderApproval = async(req,res) => {
    let order = req.order
    if (order.soldBy._id.toString() !== req.profile._id.toString()) {
        return res.status(401).json({error:"Unauthorized Admin"})
    }
    if (order.status.currentStatus !== 'active' && order.status.currentStatus !== 'approve') {
        return res.status(403).json({error:`This order cannot be approve or activate. Order current status is ${order.status.currentStatus}`})
    }
    if (order.status.currentStatus === 'active') {
        order.status.currentStatus = 'approve'
        order.status.approvedDate = Date.now()
        await order.save()
        order.soldBy = undefined
        return res.json(order)
    }
    if (order.status.currentStatus === 'approve') {
        order.status.currentStatus = 'active'
        order.status.approvedDate = null
        await order.save()
        order.soldBy = undefined
        return res.json(order)
    }
}

exports.orderCancelByAdmin = async (req, res) => {
    let order = req.order
    if (order.soldBy._id.toString() !== req.profile._id.toString()) {
        return res.status(401).json({ error: "Unauthorized Admin" })
    }
    if (order.status.currentStatus === 'complete' || order.status.currentStatus === 'return') {
        return res.status(403).json({ error: `This order is in ${order.status.currentStatus} state, cannot be cancelled.` })
    }
    if (order.status.currentStatus === 'cancel') {
        return res.status(403).json({ error: "Order has already been cancelled." })
    }
    order.status.currentStatus = 'cancel'
    order.status.cancelledDate = Date.now()
    await order.save()
    order.soldBy = undefined
    return res.json(order)
}

exports.orderCancelByUser = async (req, res) => {
    let order = req.order
    if (order.user._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: "Unauthorized User" })
    }
    if (order.status.currentStatus === 'complete' || order.status.currentStatus === 'return') {
        return res.status(403).json({ error: `This order is in ${order.status.currentStatus} state, cannot be cancelled.` })
    }
    if (order.status.currentStatus === 'cancel') {
        return res.status(403).json({error:"Order has already been cancelled."})
    }
    order.status.currentStatus = 'cancel'
    order.status.cancelledDate = Date.now()
    await order.save()
    order.soldBy = undefined
    order.user = undefined
    return res.json(order)
}

exports.toggleDispatchOrder = async (req,res) => {
    let order = req.order
    if (order.status.currentStatus !== 'approve' && order.status.currentStatus !== 'dispatch') {
        return res.status(403).json({error:`This order cannot be dispatched or rollback to approve state. Order current status is ${order.status.currentStatus}`})
    }
    if (order.status.currentStatus === 'approve') {
        order.status.currentStatus = 'dispatch'
        order.status.dispatchedDate = Date.now()
        await order.save()
        return res.json(order)
    }
    if (order.status.currentStatus === 'dispatch') {
        order.status.currentStatus = 'approve'
        order.status.dispatchedDate = null
        await order.save()
        return res.json(order)
    }
}

exports.approvedOrders = async(req,res) => {
    const page = req.query.page || 1
    let orders = await Order.find({'status.currentStatus':'approve'})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({error: "No orders are ready to ship."})
    }
    res.json(orders)
}