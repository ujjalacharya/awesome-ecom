const express = require("express");

const { product, getProduct } = require("../controllers/product")
const { addWishlist, deleteWishlist, getWishlists, searchCarts,addCart, getCarts, deleteCart,editCart,editWishlist,searchWishlists} = require("../controllers/cart_wishlist")
const { profile } = require("../controllers/admin")
const { auth: userAuth } = require("../controllers/user_auth")
const { auth: adminAuth, hasAuthorization } = require('../controllers/admin_auth')

const router = express.Router();
//cart's..    
router.post('/cart/:p_slug',userAuth, addCart)
router.patch('/delete-cart/:cart_id',userAuth,deleteCart)
router.patch('/edit-cart/:cart_id', userAuth, editCart)
router.get('/carts',userAuth, getCarts)
router.get('/search-carts',userAuth, searchCarts)

//wishlist's.. 
router.post('/wishlist/:p_slug',userAuth, addWishlist)
router.patch('/delete-wishlist/:wishlist_id',userAuth, deleteWishlist)
router.patch('/edit-wishlist/:wishlist_id', userAuth, editWishlist)
router.get('/wishlists', userAuth, getWishlists)
router.get('/search-wishlists', userAuth, searchWishlists)

router.param('p_slug', product)
router.param('id', profile)
module.exports = router;