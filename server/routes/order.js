const express = require("express");

const {auth:userAuth} = require("../controllers/user_auth")
const {auth:adminAuth, hasAuthorization} = require("../controllers/admin_auth")
const {profile} = require("../controllers/admin")
const { order, createOrder, calculateShippingCharge, toggleOrderApproval} = require("../controllers/order")

const router = express.Router();

//user's..
router.get('/shipping-charge',userAuth,calculateShippingCharge)
router.post('/create-order',userAuth,createOrder)

// admin's..-
router.patch('/toggle-order-approval/:id/:order_id', adminAuth,hasAuthorization,toggleOrderApproval)

router.param('id',profile)
router.param('order_id',order)

module.exports = router;