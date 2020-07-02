const express = require("express");

const {
    getProfile, updateProfile, profile, uploadPhoto, addAddress, editAddress, toggleAddressActiveness
} = require("../controllers/user");
const { auth, isSameUser } = require('../controllers/user_auth')

const { uploadUserPhoto } = require("../middleware/helpers");

const router = express.Router();
//address
router.post('/add-address',auth,addAddress)
router.put('/edit-address/:address_id',auth,editAddress)
router.patch('/toggle-address-activeness',auth,toggleAddressActiveness)

//profile
router.put('/',auth, updateProfile)//update or complete
router.patch('/',auth, uploadUserPhoto, uploadPhoto)
router.get("/:id", getProfile)


router.param('id', profile)

module.exports = router;