const User = require("../models/User");
const Admin = require("../models/Admin")
const Category = require("../models/Category")
const Product = require("../models/Product")
const ProductBrand = require("../models/ProductBrand")
const ProductImages = require("../models/ProductImages")
const Order = require("../models/Order")
const {calculateDistance} = require("../middleware/helpers")
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash')
const Fawn = require("fawn");
const task = Fawn.Task();
const perPage = 10;

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
    const shippingCharge = distance * shippingRate
    if (shippingCharge < 10) {
        return res.json(0)
    }
    res.json(Math.round(shippingCharge))
    
}


exports.createOrder = async (req, res) => {
    const product = await Product.findOne({ 
        slug: req.body.p_slug, 
        isVerified: { "$ne": null }, 
        isDeleted: { "$ne": null } 
    })
    if (!product) {
        return res.status(404).json({ error: "Product not found." })
    }
    if (product.quantity < req.body.quantity) {
        return res.status(403).json({error:`There are only ${product.quantity} items.`})
    }
    const order = new Order()
    order.user = req.user._id
    order.product = product._id
    order.quantity = req.body.quantity
    const status = {
        currentStatus: 'active',
        activeDate: Date.now()
    }
    order.status = status
    res.json(order)

}
