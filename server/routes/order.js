const express = require("express");

const {auth} = require("../controllers/user_auth")
const {auth, hasAuthorization} = require("../controllers/admin_auth")
const {profile} = require("../controllers/admin")
const { order, createOrder, calculateShippingCharge, toggleOrderApproval} = require("../controllers/order")

const router = express.Router();

//user's..
router.get('/shipping-charge',auth,calculateShippingCharge)
router.post('/create-order',auth,createOrder)
router.get('/')

// admin's..-
router.patch('/toggle-order-approval/:admin_id/:order_id', auth,hasAuthorization,toggleOrderApproval)

router.param('admin_id',profile)
router.param('order_id',order)

module.exports = router;