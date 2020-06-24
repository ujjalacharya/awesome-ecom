const express = require("express");

const { product, getProduct } = require("../controllers/product")
const { postReview, getReviews, averageRating, addCart, getCarts } = require("../controllers/review_qna")
const { profile } = require("../controllers/admin")
const { auth: userAuth } = require("../controllers/user_auth")
const { auth: adminAuth, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();
//cart's..    
router
    .route("/cart/:p_slug")
    .post(userAuth, addCart)
    .get(userAuth, getCarts)


router.param('p_slug', product)
router.param('id', profile)
module.exports = router;