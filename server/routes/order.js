const express = require("express");

const {auth} = require("../controllers/user_auth")
const {createOrder,calculateShippingCharge} = require("../controllers/order")

const router = express.Router();

router.get('/shipping-charge',auth,calculateShippingCharge)

router.post('/create-order',auth,createOrder)

module.exports = router;