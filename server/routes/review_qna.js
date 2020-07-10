const express = require("express");

const {product} = require("../controllers/product")
const { postReview, getReviews, averageRating, postAnswer, postQuestion, getQNAs, deleteQNAByAdmin, deleteQNAByUser, myReviews,editReview} = require("../controllers/review_qna")
const { profile } = require("../controllers/admin")
const { auth: userAuth } = require("../controllers/user_auth")
const { auth: adminAuth, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();

//review's..
router.get("/review/average-rating/:p_slug", averageRating);
router.get('/my-reviews',userAuth,myReviews)
router.put('/review/:p_slug/:review_id',userAuth,editReview)
router
    .route("/review/:p_slug")
    .post(userAuth,postReview)
    .get(getReviews)

//QNA's..
router.put('/qna/:id/:p_slug',adminAuth,hasAuthorization,postAnswer)
router.patch('/delete-qna/:id/:p_slug', adminAuth, hasAuthorization, deleteQNAByAdmin)
router.patch('/delete-qna/:p_slug', userAuth, deleteQNAByUser)
router
    .route("/qna/:p_slug")
    .post(userAuth, postQuestion)
    .get(getQNAs)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;