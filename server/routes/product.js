const express = require("express");

const { createProduct, product, getProduct, updateProduct, productImages, deleteImage, getProducts, verifiedProducts, notDeletedProducts, deletedProducts, notVerifiedProducts, deleteProduct, outOfTheStockProducts, latestProducts, deleteImageById} = require("../controllers/product")
const { profile } = require("../controllers/admin")
const { uploadProductImages } = require("../middleware/helpers");
const { validateProduct } = require("../middleware/validator")
const { auth, isSuperAdmin, isAdmin, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();
//admin's or superadmin's
router.get("/products/:id", auth, hasAuthorization, getProducts)
router.get("/verified-products/:id", auth, hasAuthorization, verifiedProducts)
router.get("/unverified-products/:id", auth, hasAuthorization, notVerifiedProducts)
router.get("/deleted-products/:id", auth, hasAuthorization, deletedProducts)
router.get("/not-deleted-products/:id", auth, hasAuthorization, notDeletedProducts)
router.get("/outofthe-stock-products/:id", auth, hasAuthorization, outOfTheStockProducts)

router.post("/images/:id", auth, hasAuthorization, uploadProductImages, productImages)
router.delete("/image/:id", auth, hasAuthorization, deleteImageById)//?image_id=
router.delete("/image/:id/:p_slug", auth, hasAuthorization, deleteImage)//?image_id=

router.patch('/delete-product/:id/:p_slug', auth, hasAuthorization, deleteProduct)
router.post("/:id", auth, hasAuthorization, validateProduct, createProduct)
router.put("/:id/:p_slug", auth, hasAuthorization, validateProduct, updateProduct)

//public
router.get('/latest',latestProducts)
router.get('/:p_slug', getProduct)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;