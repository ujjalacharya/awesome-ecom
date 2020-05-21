const express = require("express");

const {
    getProfile, updateProfile, profile, uploadPhoto
} = require("../controllers/user");
const { auth, isSameUser } = require('../controllers/user_auth')

const { uploadUserPhoto } = require("../middleware/helpers");

const router = express.Router();

router
    .route("/:id")
    .get(getProfile)
    .put(auth, isSameUser, updateProfile)//update or complete
    .patch(auth, isSameUser, uploadUserPhoto, uploadPhoto)

router.param('id', profile)

module.exports = router;