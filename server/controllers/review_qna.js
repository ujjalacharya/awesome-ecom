const User = require("../models/User");
const Admin = require("../models/Admin")
const Payment = require("../models/Payment")
const Remark = require("../models/Remark")
const Review = require("../models/Review")
const QNA = require("../models/QnA")
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

exports.postReview = async (req, res) => {
    const product = req.product
    if (!product.isVerified && product.isDeleted) {
        return res.status(404).json({ error: 'Product not found' })
    }
    if (!req.body.star || !req.body.comment) {
        return res.status(400).json({ error: 'Comment or star rating is required.' })
    }
    if (req.body.star > 5 || req.body.star < 1) {
        return res.status(403).json({ error: "Rating should be in range of 0 and 5" });
    }
    //ckeck if user has bought this product or not
    const orders = await Order.findOne({
        user: req.user._id,
        'status.currentStatus': { $in: ['complete', 'return'] },
        product: product._id
    })
    if (!orders) {
        return res.status(403).json({ error: "You have not bought this product." })
    }
    let newReview = {
        user: req.user._id,
        product: product._id,
        comment: req.body.comment,
        star: req.body.star
    };
    newReview = new Review(newReview);
    await newReview.save();
    res.json(newReview);
}

exports.getReviews = async (req, res) => {
    const page = req.query.page || 1;
    const product = req.product
    if (!product.isVerified && product.isDeleted) {
        return res.status(404).json({ error: 'Product not found' })
    }
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
    if (!product.isVerified && product.isDeleted) {
        return res.status(404).json({ error: 'Product not found' })
    }
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

exports.postQuestion = async (req, res) => {
    const product = req.product
    if (!product.isVerified && product.isDeleted) {
        return res.status(404).json({error:'Product not found'})
    }
    let QnA = await QNA.findOne({ product: product._id })
    if (!QnA) {
        let newQNA = new QNA({
            product: product._id,
            qna: [{
                question: req.body.question,
                questionby: req.user.id,
                questionedDate: Date.now()
            }]
        })
        await newQNA.save()
        return res.json(newQNA)
    }
    QnA.qna.push({
        question: req.body.question,
        questionby: req.user.id,
        questionedDate: Date.now()
    })
    await QnA.save()
    res.json(QnA)
}

exports.postAnswer = async(req,res) => {
    const product = req.product
    if (!product.isVerified && product.isDeleted) {
        return res.status(404).json({ error: 'Product not found' })
    }
    if (product.soldBy._id.toString() !== req.profile._id.toString()) {
        return res.status(401).json({error:'Unauthorized admin.'})
    }
    let QnA = await QNA.findOne({ product: product._id })
    if (!QnA) {
        return res.status(404).json({error:'QNA not found'})
    }
    if (!QnA.qna.some(q=>q._id.toString()===req.body.qna_id)) {
        return res.status(404).json({error:'Invalid qna id.'})
    }
    if (QnA.qna.some(q => {if (q._id.toString() === req.body.qna_id)return q.answer})) {
        return res.status(404).json({ error: 'Answer has given' })
    }
    for (let i = 0; i < QnA.qna.length; i++) {
        const targetQnA = QnA.qna[i];
        if (targetQnA._id.toString()===req.body.qna_id) {
            targetQnA.answer= req.body.answer
            targetQnA.answerby = req.profile._id
            targetQnA.answeredDate=Date.now()
            break;
        }
    }
    await QnA.save()
    res.json(QnA)

}

exports.deleteQNAByAdmin = async(req,res) => {
    const product = req.product
    if (!product.isVerified && product.isDeleted) {
        return res.status(404).json({ error: 'Product not found' })
    }
    if (product.soldBy._id.toString() !== req.profile._id.toString()) {
        return res.status(401).json({ error: 'Unauthorized admin.' })
    }
    let QnA = await QNA.findOne({ product: product._id })
    if (!QnA) {
        return res.status(404).json({ error: 'QNA not found' })
    }
    if (!QnA.qna.some(q => q._id.toString() === req.body.qna_id)) {
        return res.status(404).json({ error: 'Invalid qna id.' })
    }
    QnA.qna = QnA.qna.map(q => {
        if(q._id.toString() === req.body.qna_id)q.isDeleted = Date.now()
        return q
    })
    await QnA.save()
    res.json(QnA)
}

exports.deleteQNAByUser = async (req, res) => {
    const product = req.product
    if (!product.isVerified && product.isDeleted) {
        return res.status(404).json({ error: 'Product not found' })
    }
    let QnA = await QNA.findOne({ product: product._id })
    if (!QnA) {
        return res.status(404).json({ error: 'QNA not found' })
    }
    if (!QnA.qna.some(q => q._id.toString() === req.body.qna_id)) {
        return res.status(404).json({ error: 'Invalid qna id.' })
    }
    QnA.qna = QnA.qna.map(q => {
        if ((q._id.toString() === req.body.qna_id)
         && 
         (q.questionby.toString()===req.user._id.toString())) q.isDeleted = Date.now()
        return q
    })
    await QnA.save()
    res.json(QnA)
}

exports.getQNAs = async (req, res) => {
    const product = req.product
    if (!product.isVerified && product.isDeleted) {
        return res.status(404).json({ error: 'Product not found' })
    }
    let QnA = await QNA.findOne({ product: product._id })
    if (!QnA) {
        return res.status(404).json({ error: 'QNA not found' })
    }
    //need to remove isDeleted QNAs...
    res.json(QnA)

}


