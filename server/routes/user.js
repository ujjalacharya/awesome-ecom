const express = require("express");

const {
    getProfile, updateProfile, profile,
} = require("../controllers/user");
const {auth,hasAuthorization} = require('../controllers/user_auth')

const { uploadUserPhoto } = require("../middleware/helpers");

const router = express.Router();

router
    .route("/:id")
    .get(getProfile)
    .put(auth, hasAuthorization, uploadUserPhoto, updateProfile)//update or complete

router.param('id', profile)

module.exports = router;