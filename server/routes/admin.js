const express = require("express");

const {
    getProfile, updateProfile, profile, businessinfo, bankinfo, warehouse
} = require("../controllers/admin");
const {auth,hasAuthorization} = require('../controllers/admin_auth')

const { uploadAdminPhoto, uploadAdminDoc,uploadCheque } = require("../middleware/helpers");
const { validateAdminBankInfo, validateBusinessInfo, validateWareHouse} = require("../middleware/validator")

const router = express.Router();

router
    .route("/:id")
    .get(getProfile)
    .put(auth, hasAuthorization, uploadAdminPhoto, updateProfile)//update or complete
router.put('/businessinfo/:id', auth, hasAuthorization, uploadAdminDoc, validateBusinessInfo, businessinfo)
router.put('/bank/:id', auth, hasAuthorization, uploadCheque, validateAdminBankInfo, bankinfo)
router.put('/warehouse/:id', auth, hasAuthorization, validateWareHouse, warehouse)

router.param('id', profile)

module.exports = router;