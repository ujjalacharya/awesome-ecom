const express = require("express");

const {auth} = require("../controllers/user_auth")
const {createOrder} = require("../controllers/order")

const router = express.Router();

router.post('/create-order',auth,createOrder)

module.exports = router;