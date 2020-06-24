const User = require("../models/User");
const Admin = require("../models/Admin")
const Payment = require("../models/Payment")
const Remark = require("../models/Remark")
const Review = require("../models/Review")
const Cart = require("../models/Cart")
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

exports.postReview = async (req,res) => {
    const product = req.product
    if (!req.body.star || !req.body.comment ) {
        return res.status(400).json({error:'Comment or star rating is required.'})
    }
    if (req.body.star > 5 || req.body.star < 1) {
        return res.status(403).json({ error: "Rating should be in range of 0 and 5" });
    }
    //ckeck if user has bought this product or not
    const orders = await Order.findOne({
        user:req.user._id,
        // $or: [{ 'stauts.currentStatus': 'complete' }, { 'stauts.currentStatus': 'return' }],
        'status.currentStatus':{$in:['complete','return']},
        product: product._id
    })
    console.log(req.user._id,product._id,orders);
    if (!orders) {
        return res.status(403).json({error:"You have not bought this product."})
    }
    let newReview = {
        user: req.user._id,
        product: product._id,
        comment: req.body.comment,
        star: req.body.star
    };
    newReview = new Review(newReview);
    // await newReview.save();
    res.json(newReview);
}

exports.getReviews = async (req, res) => {
    const page = req.query.page || 1;
    const product = req.product
    const reviews = await Review.find({ product: product._id }).populate('user', 'name lastname')
        .skip(perPage * page - perPage)
        .limit(perPage)
    if (!reviews.length) {
        return res.status(404).json({ error: "No reviews found" });
    }
    res.json(reviews);
};

exports.averageRating = async (req, res) => {
    const product = req.product
    let stars = await Review.find({ product: product._id }).select('star');
    let fiveStars = 0, fourStars = 0, threeStars = 0, twoStars = 0, oneStars = 0;
    stars.forEach(s => {
        if (s.star === 5) fiveStars += 1
        if (s.star === 4) fourStars += 1
        if (s.star === 3) threeStars += 1
        if (s.star === 2) twoStars += 1
        if (s.star === 1) oneStars += 1
    })
    let totalRatingUsers = (fiveStars + fourStars + threeStars + twoStars + oneStars)
    let averageStar = (5 * fiveStars + 4 * fourStars + 3 * threeStars + 2 * twoStars + oneStars) / totalRatingUsers

    stars = {
        fiveStars,
        fourStars,
        threeStars,
        twoStars,
        oneStars,
        averageStar,
        totalRatingUsers
    }
    res.json(stars)
}




