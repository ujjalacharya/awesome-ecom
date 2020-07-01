const express = require("express");

const {
    getProfile, updateProfile, profile, uploadPhoto, addAddress
} = require("../controllers/user");
const { auth, isSameUser } = require('../controllers/user_auth')

const { uploadUserPhoto } = require("../middleware/helpers");

const router = express.Router();
//address
router.post('/add-address',auth,addAddress)

//profile
router.put('/',auth, updateProfile)//update or complete
router.patch('/',auth, uploadUserPhoto, uploadPhoto)
router.get("/:id", getProfile)


router.param('id', profile)

module.exports = router;