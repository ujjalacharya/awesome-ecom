const User = require("../models/User");
const Admin = require("../models/Admin")
const Payment = require("../models/Payment")
const Remark = require("../models/Remark")
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
// const Fawn = require("fawn");
// const task = Fawn.Task();
const perPage = 10;

exports.order = async(req,res,next) => {
    const order = await Order.findById(req.params.order_id)
        .populate('user','-password -salt -resetPasswordLink -emailVerifyLink')
        .populate('payment','-user -order')
        .populate('product','_id slug name price discountRate category brand return isVerified isDeleted warranty quantity')
        .populate('soldBy','name shopName address isVerified isBlocked holidayMode photo email adminWareHouse')
        .populate('status.cancelledDetail.remark')//not working..
    if (!order) {
        return res.status(404).json({error:"Order not found"})
    }
    req.order = order
    next();
}

exports.userOrder = (req,res) => {
    let order = req.order
    order.user = undefined
    order.soldBy = undefined
    res.json(order)
}

exports.adminOrder = (req, res) => {
    let order = req.order
    order.soldBy = undefined
    res.json(order)
}

exports.dispatcherOrder = (req, res) => {
    let order = req.order
    res.json(order)
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
    //fawn was used
    const product = await Product.findOne({ 
        slug: req.body.p_slug, 
        isVerified: { "$ne": null }, 
        isDeleted: null
    }).populate('soldBy','isBlocked isVerified holidayMode')
    const isAdminOnHoliday = (first, last) => {
        let week = [0, 1, 2, 3, 4, 5, 6]
        let firstIndex = week.indexOf(first);
        week = week.concat(week.splice(0, firstIndex))//Shift array so that first day is index 0
        let lastIndex = week.indexOf(last)//Find last day
        //Cut from first day to last day nd check with today day
        return week.slice(0, lastIndex + 1).some(d => d === new Date().getDay());

    }
    if (!product || product.soldBy.isBlocked || !product.soldBy.isVerified || isAdminOnHoliday(product.soldBy.holidayMode.start, product.soldBy.holidayMode.end)) {
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
    newOrder.productAttributes = req.body.productAttributes
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
    
    product.quantity = product.quantity - newOrder.quantity
    await newOrder.save()
    await newPayent.save()
    await product.save()
    res.json({order:newOrder,payment:newPayent})
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
exports.userActiveOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ user: req.user._id ,'status.currentStatus':'active'})
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No active orders found" })
    }
    res.json(orders)
}

exports.userCompleteOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ user: req.user._id, 'status.currentStatus': 'complete' })
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No complete orders found" })
    }
    res.json(orders)
}

exports.userCancelOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ user: req.user._id, 'status.currentStatus': 'cancel' })
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No cancel orders found" })
    }
    res.json(orders)
}

exports.userReturnOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ user: req.user._id, 'status.currentStatus': 'return' })
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No return orders found" })
    }
    res.json(orders)
}

exports.adminOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id })
        .populate('user', 'name address muncipality tole')
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No orders found" })
    }
    res.json(orders)
}

exports.adminActiveOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id, 'status.currentStatus':'active' })
        .populate('user', 'name address muncipality tole')
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No active orders found" })
    }
    res.json(orders)
}

exports.adminApproveOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id, 'status.currentStatus': 'approve' })
        .populate('user', 'name address muncipality tole')
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No approve orders found" })
    }
    res.json(orders)
}

exports.adminDispatchOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id, 'status.currentStatus': 'dispatch' })
        .populate('user', 'name address muncipality tole')
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No dispatch orders found" })
    }
    res.json(orders)
}

exports.adminCancelOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id, 'status.currentStatus': 'cancel' })
        .populate('user', 'name address muncipality tole')
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No cancel orders found" })
    }
    res.json(orders)
}

exports.adminCompleteOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id, 'status.currentStatus': 'complete' })
        .populate('user', 'name address muncipality tole')
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No complete orders found" })
    }
    res.json(orders)
}

exports.adminToBeReturnOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id, 'status.currentStatus': 'tobereturn' })
        .populate('user', 'name address muncipality tole')
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No to be return orders found" })
    }
    res.json(orders)
}

exports.adminReturnOrders = async (req, res) => {
    const page = req.query.page || 1
    let orders = await Order.find({ soldBy: req.profile._id, 'status.currentStatus': 'return' })
        .populate('user', 'name address muncipality tole')
        .populate('product', 'name price discountRate')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
        .sort({ created: -1 })
    if (!orders.length) {
        return res.status(404).json({ error: "No return orders found" })
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
    //fawn was used
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
    const newRemark = new Remark({comment:req.body.remark})
    order.status.currentStatus = 'cancel'
    order.status.cancelledDetail.cancelledDate = Date.now()
    order.status.cancelledDetail.cancelledBy = req.profile._id,
    order.status.cancelledDetail.remark = newRemark._id
    let product = await Product.findById(order.product._id)
    product.quantity = order.quantity + product.quantity

    await newRemark.save()
    await order.save()
    await product.save()
    order.soldBy = undefined
    return res.json({remark:newRemark,order,product})
}

exports.orderCancelByUser = async (req, res) => {
    // fawn was used
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
    const newRemark = new Remark({ comment: req.body.remark })
    order.status.currentStatus = 'cancel'
    order.status.cancelledDetail.cancelledDate = Date.now()
    order.status.cancelledDetail.cancelledBy = req.user._id,
    order.status.cancelledDetail.remark = newRemark._id

    let product = await Product.findById(order.product._id)
    product.quantity = order.quantity + product.quantity

    await newRemark.save()
    await order.save()
    await product.save()
    order.soldBy = undefined
    order.user = undefined
    return res.json({remark: newRemark, order, product})
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

exports.toggleCompleteOrder = async (req, res) => {
    let order = req.order
    if (order.status.currentStatus !== 'complete' && order.status.currentStatus !== 'dispatch') {
        return res.status(403).json({ error: `This order cannot be completed or rollback to dispatch state. Order current status is ${order.status.currentStatus}` })
    }
    if (order.status.currentStatus === 'dispatch') {
        order.status.currentStatus = 'complete'
        order.status.completedDate = Date.now()
        order.isPaid = true
        await order.save()
        return res.json(order)
    }
    if (order.status.currentStatus === 'complete') {
        order.status.currentStatus = 'dispatch'
        order.status.completedDate = null
        order.isPaid = false
        await order.save()
        return res.json(order)
    }
}

exports.returnOrder = async (req, res) => {
    //fawn was used
    let order = req.order
    if (order.status.currentStatus !== 'tobereturn') {
        return res.status(403).json({ error: `This order cannot be returned. Order current status is ${order.status.currentStatus}` })
    }
    const newRemark = new Remark({ comment: req.body.remark })

    order.status.currentStatus = 'return'
    order.status.returnedDetail.returnedDate = Date.now()
    order.status.returnedDetail.remark = newRemark._id

    let product = await Product.findById(order.product._id)
    product.quantity = order.quantity + product.quantity

    await newRemark.save()
    await order.save()
    await product.save()
    order.soldBy = undefined
    order.user = undefined
    return res.json({ remark: newRemark, order, product })
}

exports.toggletobeReturnOrder = async (req, res) => {
    //fawn was used
    let order = req.order
    if (order.status.currentStatus !== 'complete' && order.status.currentStatus !== 'tobereturn' ) {
        return res.status(403).json({ error: `This order is not ready to return or rollback to complete state. Order current status is ${order.status.currentStatus}` })
    }
    let payment = await Payment.findById(order.payment._id)
    if (order.status.currentStatus === 'complete') {
        order.status.currentStatus = 'tobereturn'
        order.status.tobereturnedDate = Date.now()

        payment.returnedAmount = req.body.returnedAmount
        await order.save()
        await payment.save()
        return res.json({order,payment})
    }
    if (order.status.currentStatus === 'tobereturn') {
        order.status.currentStatus = 'complete'
        order.status.tobereturnedDate = null

        payment.returnedAmount = undefined
        await order.save()
        await payment.save()
        return res.json({ order, payment })
    }
}
