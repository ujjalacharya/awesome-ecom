const express = require("express");

const { createProduct, product, getProduct, updateProduct, productBrand, productImages} = require("../controllers/product")
const { profile } = require("../controllers/admin")
const { uploadProductImages } = require("../middleware/helpers");
const { validateProduct } = require("../middleware/validator")
const { auth, isSuperAdmin, isAdmin, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();
router.get("/product-brand", productBrand)
router.post("/upload-product-images/:id",auth,hasAuthorization, uploadProductImages, productImages)
router.route("/:id")
    .post(auth, hasAuthorization, validateProduct, createProduct)
router.put("/:id/:p_slug", auth, hasAuthorization, validateProduct, updateProduct)
router.get('/:p_slug', getProduct)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;