const express = require("express");

const { product, getProduct } = require("../controllers/product")
const { addWishlist,deleteWishlist,getWishlists,addCart, getCarts, deleteCart} = require("../controllers/cart_wishlist")
const { profile } = require("../controllers/admin")
const { auth: userAuth } = require("../controllers/user_auth")
const { auth: adminAuth, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();
//cart's..    
router.post('/cart/:p_slug',userAuth, addCart)
router.patch('/delete-cart/:cart_id',userAuth,deleteCart)
router.get('/carts',userAuth, getCarts)

//wishlist's.. 
router.post('/wishlist/:p_slug',userAuth, addWishlist)
router.patch('/delete-wishlist/:wishlist_id',userAuth, deleteWishlist)
router.get('/wishlists', userAuth, getWishlists)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;