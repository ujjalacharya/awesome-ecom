const express = require("express");

const {product, getProduct} = require("../controllers/product")
const { postReview, getReviews, averageRating} = require("../controllers/reviewCartWishlist")
const { profile } = require("../controllers/admin")
const { auth: userAuth } = require("../controllers/user_auth")
const { auth: adminAuth, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();

router.get("/review/average-rating/:p_slug", averageRating);

router
    .route("/review/:p_slug")
    .post(userAuth,postReview)
    .get(getReviews)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;