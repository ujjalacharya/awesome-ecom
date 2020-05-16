const express = require("express");

const {createProduct,product,getProduct,updateProduct} = require("../controllers/product")
const {profile} = require("../controllers/admin")
const {uploadProductImages } = require("../middleware/helpers");
const { validateProduct } = require("../middleware/validator")
const { auth, isSuperAdmin, isAdmin,hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();
router.get('/:p_slug',getProduct)
router.post("/:id",auth, hasAuthorization ,uploadProductImages,validateProduct,createProduct)
router.put("/:id/:p_slug", auth, hasAuthorization, uploadProductImages, validateProduct, updateProduct)

router.param('p_slug',product)
router.param('id',profile)
module.exports = router;