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
const userHas = require("../middleware/user_actions/userHas")
const getRatingInfo = require("../middleware/user_actions/getRatingInfo")
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


const run = async () => {
    let products = await Product.find({ isDeleted: null, isVerified: { $ne: null } })
    let users = await User.find()
    users = users.map(async u => {
        let carts = []
        let wishlists = []
        for (let i = 0; i < 20; i++) {
            let cart = new Cart({
                user: u._id,
                product: products[i]._id,
                quantity: _.random(1, 4)
            })
            carts.push(cart)
            let wishlist = new Wishlist({
                user: u._id,
                product: products[i]._id,
                quantity: _.random(1, 4)
            })
            wishlists.push(wishlist)
        }
        carts = carts.map(async c => await c.save())
        carts = await Promise.all(carts)
        wishlists = wishlists.map(async c => await c.save())
        wishlists = await Promise.all(wishlists)
    })
    await Promise.all(users)
}
run()

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
    let carts = await Cart.find({ user: req.user._id, isDeleted: null })
        .populate({
            path: 'product',
            populate: {
                path: 'images',
                model: 'productimages'
            }
        })
        .populate({
            path: 'product',
            select: 'name slug images soldBy discountRate price quantity',
            populate: {
                path: 'soldBy',
                model: 'admin',
                select: 'name shopName address'
            }
        })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    //user's action on each product
    carts = carts.map(async c => {
        //user's action on this product
        const { hasOnWishlist } = await userHas(c.product, req.user, 'carts')
        //ratings of this product
        c.stars = await getRatingInfo(c.product)
        c.hasOnWishlist = hasOnWishlist
        return c
    })
    carts = await Promise.all(carts)
    const totalCount = await Cart.countDocuments({ user: req.user._id, isDeleted: null })
    res.json({ carts, totalCount })

}

exports.deleteCart = async (req, res) => {
    let cart = await Cart.findOne({ _id: req.params.cart_id, user: req.user._id })
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found.' })
    }
    cart.isDeleted = Date.now()
    await cart.save()
    res.json(cart)
}
exports.editCart = async (req, res) => {
    let cart = await Cart.findOne({ _id: req.params.cart_id, user: req.user._id, isDeleted: null })
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found.' })
    }
    cart.quantity = req.query.quantity
    await cart.save()
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
    let wishlists = await Wishlist.find({ user: req.user._id, isDeleted: null })
        .populate({
            path: 'product',
            populate: {
                path: 'images',
                model: 'productimages'
            }
        })
        .populate({
            path: 'product',
            select: 'name slug images soldBy discountRate price quantity',
            populate: {
                path: 'soldBy',
                model: 'admin',
                select: 'name shopName address'
            }
        })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .lean()
    //user's action on each product
    wishlists = wishlists.map(async c => {
        //user's action on this product
        const { hasOnCart } = await userHas(c.product, req.user, 'wishlists')
        //ratings of this product
        c.stars = await getRatingInfo(c.product)
        c.hasOnCart = hasOnCart
        return c
    })
    wishlists = await Promise.all(wishlists)
    const totalCount = await Wishlist.countDocuments({ user: req.user._id, isDeleted: null })
    res.json({ wishlists, totalCount })

}

exports.deleteWishlist = async (req, res) => {
    let wishlist = await Wishlist.findOne({ _id: req.params.wishlist_id, user: req.user._id })
    if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist not found.' })
    }
    wishlist.isDeleted = Date.now()
    await wishlist.save()
    res.json(wishlist)
}

exports.editWishlist = async (req, res) => {
    let wishlist = await Wishlist.findOne({ _id: req.params.wishlist_id, user: req.user._id, isDeleted: null })
    if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist not found.' })
    }
    wishlist.quantity = req.query.quantity
    await wishlist.save()
    res.json(wishlist)
}