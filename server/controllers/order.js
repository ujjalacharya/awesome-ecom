const User = require("../models/User");
const Category = require("../models/Category")
const Product = require("../models/Product")
const ProductBrand = require("../models/ProductBrand")
const ProductImages = require("../models/ProductImages")
const Order = require("../models/Order")
const sharp = require("sharp")
const path = require("path");
const fs = require("fs");
const _ = require('lodash')
const Fawn = require("fawn");
const task = Fawn.Task();
const perPage = 10;

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
