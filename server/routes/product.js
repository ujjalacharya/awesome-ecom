const express = require("express");

const { createProduct, product, getProduct, updateProduct, productImages, deleteImage, getProducts, deleteProduct, latestProducts, deleteImageById, getProductsByCategory, generateFilter, searchProducts, suggestKeywords} = require("../controllers/product")
const { profile } = require("../controllers/admin")
const { uploadProductImages , waterMarker} = require("../middleware/helpers");
const { validateProduct } = require("../middleware/validator")
const { auth, isSuperAdmin, isAdmin, hasAuthorization } = require('../controllers/admin_auth')
const {checkUserSignin} = require("../controllers/user_auth")

const router = express.Router();

//admin's or superadmin's
router.get("/products/:id", auth, hasAuthorization, getProducts)

router.post("/images/:id", auth, hasAuthorization, uploadProductImages,waterMarker, productImages)
router.delete("/image/:id", auth, hasAuthorization, deleteImageById)//?image_id=
router.delete("/image/:id/:p_slug", auth, hasAuthorization, deleteImage)//?image_id=
router.patch('/delete-product/:id/:p_slug', auth, hasAuthorization, deleteProduct)

//public
router.get('/latest',checkUserSignin,latestProducts)    
router.get('/by-category', checkUserSignin, getProductsByCategory)//?cat_id=&cat_slug=
router.get('/generate-filter', generateFilter)//?keyword= or ?cat_id=&cat_slug=
router.post('/search',checkUserSignin,searchProducts)//need to work on rating nd $option in regex
router.get('/suggest-keywords', suggestKeywords)//?keyword=

router.post("/:id", auth, hasAuthorization, validateProduct, createProduct)
router.put("/:id/:p_slug", auth, hasAuthorization, validateProduct, updateProduct)
router.get('/:p_slug',checkUserSignin, getProduct)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;