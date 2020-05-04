const express = require("express");

const {
    getProfile, updateProfile, profile,
} = require("../controllers/admin");
const {auth,hasAuthorization} = require('../controllers/admin_auth')

const { uploadAdminPhoto } = require("../middleware/helpers");

const router = express.Router();

router
    .route("/:id")
    .get(getProfile)
    .put(auth, hasAuthorization, uploadAdminPhoto, updateProfile)//update or complete

router.param('id', profile)

module.exports = router;