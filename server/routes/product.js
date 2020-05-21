const express = require("express");

const { createProduct, product, getProduct, updateProduct, productImages, deleteImage, getProducts, verifiedProducts, notDeletedProducts, deletedProducts, notVerifiedProducts } = require("../controllers/product")
const { profile } = require("../controllers/admin")
const { uploadProductImages } = require("../middleware/helpers");
const { validateProduct } = require("../middleware/validator")
const { auth, isSuperAdmin, isAdmin, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();
router.get("/products", auth, hasAuthorization, getProducts)
router.get("/verified-products", auth, hasAuthorization, verifiedProducts)
router.get("/unverified-products", auth, hasAuthorization, notVerifiedProducts)
router.get("/deleted-products", auth, hasAuthorization, deletedProducts)
router.get("/not-deleted-products", auth, hasAuthorization, notDeletedProducts)

router.post("/images/:id", auth, hasAuthorization, uploadProductImages, productImages)
router.delete("/image/:id/:p_slug", auth, hasAuthorization, deleteImage)//?image_id=

router.post("/:id", auth, hasAuthorization, validateProduct, createProduct)
router.put("/:id/:p_slug", auth, hasAuthorization, validateProduct, updateProduct)
router.get('/:p_slug', getProduct)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;