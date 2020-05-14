const express = require("express");

const {createProduct} = require("../controllers/product")
const {profile} = require("../controllers/admin")
const {uploadProductImages } = require("../middleware/helpers");
const { validateProduct } = require("../middleware/validator")
const { auth, isSuperAdmin, isAdmin,hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();

router.post("/:id",auth, hasAuthorization ,uploadProductImages,validateProduct,createProduct)

router.param('id',profile)
module.exports = router;