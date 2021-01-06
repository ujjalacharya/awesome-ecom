const express = require("express");

const { createProduct, product, getProduct, updateProduct, productImages, deleteImage, getProducts, deleteProduct, minedProducts, deleteImageById, getProductsByCategory, generateFilter, searchProducts, suggestKeywords, forYouProducts} = require("../controllers/product")
const { profile } = require("../controllers/admin")
const { uploadProductImages , waterMarker} = require("../middleware/helpers");
const { validateProduct } = require("../middleware/validator")
const { auth: adminAuth, isSuperAdmin, isAdmin, hasAuthorization, checkAdminSignin } = require('../controllers/admin_auth')
const {checkUserSignin, auth: userAuth} = require("../controllers/user_auth")

const router = express.Router();

//admin's or superadmin's
router.get("/products/:id", adminAuth, hasAuthorization, getProducts)

router.post("/images/:id", adminAuth, hasAuthorization, uploadProductImages,waterMarker, productImages)
router.delete("/image/:id", adminAuth, hasAuthorization, deleteImageById)//?image_id=
router.delete("/image/:id/:p_slug", adminAuth, hasAuthorization, deleteImage)//?image_id=
router.patch('/delete-product/:id/:p_slug', adminAuth, hasAuthorization, deleteProduct)

//user
router.get('/for-you', userAuth, forYouProducts)

//public
router.get('/mined-products',checkUserSignin,minedProducts)   
router.get('/by-category', checkUserSignin, getProductsByCategory)//?cat_id=&cat_slug=
router.get('/generate-filter', generateFilter)//?keyword= or ?cat_id=&cat_slug=
router.post('/search',checkUserSignin,searchProducts)//need to work on rating nd $option in regex
router.get('/suggest-keywords', suggestKeywords)//?keyword=

router.post("/:id", adminAuth, hasAuthorization, validateProduct, createProduct)
router.put("/:id/:p_slug", adminAuth, hasAuthorization, validateProduct, updateProduct)
router.get('/:p_slug', checkUserSignin, checkAdminSignin, getProduct)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;