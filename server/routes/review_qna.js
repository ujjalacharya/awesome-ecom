const express = require("express");

const {product} = require("../controllers/product")
const { postReview, getReviews, averageRating, postAnswer,postQuestion,getQNAs} = require("../controllers/review_qna")
const { profile } = require("../controllers/admin")
const { auth: userAuth } = require("../controllers/user_auth")
const { auth: adminAuth, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();

//review's..
router.get("/review/average-rating/:p_slug", averageRating);
router
    .route("/review/:p_slug")
    .post(userAuth,postReview)
    .get(getReviews)

//QNA's..
router
    .route("/qna/:p_slug")
    .post(userAuth, postQuestion)
    .put(adminAuth,hasAuthorization,postAnswer)//?qna_id=
    .get(getQNAs)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;