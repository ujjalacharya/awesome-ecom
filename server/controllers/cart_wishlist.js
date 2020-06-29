const User = require("../models/User");
const Admin = require("../models/Admin")
const Payment = require("../models/Payment")
const Remark = require("../models/Remark")
const Review = require("../models/Review")
const Cart = require("../models/Cart")
const Wishlist = require('../models/WishList')
const Category = require("../models/Category")
const Product = require("../models/Product")
const ProductBrand = require("../models/ProductBrand")
const ProductImages = require("../models/ProductImages")
const Order = require("../models/Order")
const { calculateDistance } = require("../middleware/helpers")
const sharp = require("sharp")
const shortid = require('shortid');
const path = require("path");
const fs = require("fs");
const _ = require('lodash')
const Fawn = require("fawn");
const task = Fawn.Task();
const perPage = 10;

exports.addCart = async (req, res) => {
    const product = req.product
    if (req.query.quantity < 1) {
        return res.status(403).json({ error: 'Quantity is required' })
    }
    let newCart = {
        user: req.user._id,
        product: product._id,
        quantity: req.body.quantity
    };
    newCart = new Cart(newCart);
    await newCart.save();
    res.json(newCart);
}

exports.getCarts = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10;
    let carts = await Cart.find({ user: req.user._id })
        .populate('product','name slug')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!carts.length) {
    //     return res.status(404).json({ error: 'Carts not found' })
    // }
    const totalCount = await Cart.countDocuments({ user: req.user._id })
    res.json({carts,totalCount})

}

exports.deleteCart = async (req,res) => {
    let cart = await Cart.findOne({_id:req.params.cart_id,user:req.user._id})
    if (!cart) {
        return res.status(404).json({error:'Cart not found.'})
    }
    cart.isDeleted = Date.now()
    res.json(cart)
}

exports.addWishlist = async (req, res) => {
    const product = req.product
    if (req.query.quantity < 1) {
        return res.status(403).json({ error: 'Quantity is required' })
    }
    let newWishlist = {
        user: req.user._id,
        product: product._id,
        quantity: req.body.quantity
    };
    newWishlist = new Wishlist(newWishlist);
    await newWishlist.save();
    res.json(newWishlist);
}

exports.getWishlists = async (req, res) => {
    const page = +req.query.page || 1
    const perPage = +req.query.perPage || 10;
    let wishlists = await Wishlist.find({ user: req.user._id })
        .populate('product', 'name slug')
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    // if (!wishlists.length) {
    //     return res.status(404).json({ error: 'Wishlists not found' })
    // }
    const totalCount = await Wishlist.countDocuments({ user: req.user._id })
    res.json({ wishlists, totalCount })

}

exports.deleteWishlist = async (req, res) => {
    let wishlist = await Wishlist.findOne({ _id: req.params.wishlist_id, user: req.user._id })
    if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist not found.' })
    }
    wishlist.isDeleted = Date.now()
    res.json(wishlist)
}