const express = require("express");

const { product, getProduct } = require("../controllers/product")
const { addWishlist,deleteWishlist,getWishlists,addCart, getCarts, deleteCart} = require("../controllers/cart_wishlist")
const { profile } = require("../controllers/admin")
const { auth: userAuth } = require("../controllers/user_auth")
const { auth: adminAuth, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();
//cart's..    
router
    .route("/cart/:p_slug")
    .post(userAuth, addCart)
    .patch(userAuth,deleteCart)
router.get('/carts',userAuth, getCarts)

//wishlist's..    
router
    .route("/wishlist/:p_slug")
    .post(userAuth, addWishlist)
    .patch(userAuth, deleteWishlist)
router.get('/carts', userAuth, getWishlists)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;