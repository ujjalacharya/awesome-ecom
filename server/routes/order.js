const express = require("express");

const {auth:userAuth} = require("../controllers/user_auth")
const {auth:adminAuth, hasAuthorization} = require("../controllers/admin_auth")
const {auth:dispatcherAuth} = require("../controllers/dispatcher_auth")
const {profile} = require("../controllers/admin")
const { order, createOrder, calculateShippingCharge, toggleOrderApproval, orderCancelByAdmin, orderCancelByUser, toggleDispatchOrder, userOrders, adminOrders, approvedOrders, toggleCompleteOrder, toggleReturnOrder} = require("../controllers/order")

const router = express.Router();

//user's..
router.get('/shipping-charge',userAuth,calculateShippingCharge)
router.post('/create-order',userAuth,createOrder)
router.patch('/cancel-order/:order_id', userAuth,orderCancelByUser)
router.get('/orders', userAuth, userOrders)

// admin's..
router.patch('/toggle-order-approval/:id/:order_id', adminAuth,hasAuthorization,toggleOrderApproval)
router.patch('/cancel-order/:id/:order_id',adminAuth,hasAuthorization,orderCancelByAdmin)
router.get('/orders/:id', adminAuth, hasAuthorization, adminOrders)

// dispatcher's..
router.patch('/toggle-dispatch-order/:order_id',dispatcherAuth,toggleDispatchOrder)//approve/dispatch
router.get('/approved-orders',dispatcherAuth,approvedOrders)
router.patch('/toggle-complete-order-request/:order_id',dispatcherAuth,toggleCompleteOrder)//dispatch/complete
router.patch('/toggle-return-order/:order_id', dispatcherAuth, toggleReturnOrder)//complete/return

router.param('id',profile)
router.param('order_id',order)

module.exports = router;