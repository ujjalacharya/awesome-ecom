const express = require("express");

const {auth:userAuth} = require("../controllers/user_auth")
const {auth:adminAuth, hasAuthorization} = require("../controllers/admin_auth")
const {auth:dispatcherAuth} = require("../controllers/dispatcher_auth")
const {profile} = require("../controllers/admin")
const { order, createOrder, calculateShippingCharge, toggleOrderApproval, orderCancelByAdmin, orderCancelByUser, toggleDispatchOrder, userOrders, userOrder, adminOrders, adminOrder, approvedOrders, toggleCompleteOrder, returnOrder, dispatcherOrder, toggletobeReturnOrder, userActiveOrders, userCancelOrders, userCompleteOrders, userReturnOrders, adminActiveOrders, adminApproveOrders, adminCancelOrders, adminCompleteOrders, adminDispatchOrders, adminReturnOrders, adminToBeReturnOrders, dispatcherToBeReturnOrders} = require("../controllers/order")

const router = express.Router();

//user's..
router.get('/shipping-charge',userAuth,calculateShippingCharge)
router.post('/create-order',userAuth,createOrder)
router.patch('/cancel-order/:order_id', userAuth,orderCancelByUser)
router.get('/orders', userAuth, userOrders)
router.get('/active-orders', userAuth, userActiveOrders)
router.get('/cancel-orders', userAuth, userCancelOrders)
router.get('/complete-orders', userAuth, userCompleteOrders)
router.get('/return-orders', userAuth, userReturnOrders)
router.get('/user-order/:order_id',userAuth,userOrder)//get order by user

// admin's..
router.patch('/toggle-order-approval/:id/:order_id', adminAuth,hasAuthorization,toggleOrderApproval)//active/approve
router.patch('/cancel-order/:id/:order_id',adminAuth,hasAuthorization,orderCancelByAdmin)
router.patch('/toggle-order-to-get-return/:id/:order_id', adminAuth, hasAuthorization, toggletobeReturnOrder)//comlete/tobereturn
router.get('/orders/:id', adminAuth, hasAuthorization, adminOrders)
router.get('/admin-order/:id/:order_id',adminAuth,hasAuthorization,adminOrder)//get order by admin
router.get('/active-orders/:id', adminAuth, hasAuthorization, adminActiveOrders)
router.get('/approve-orders/:id', adminAuth, hasAuthorization, adminApproveOrders)
router.get('/cancel-orders/:id', adminAuth, hasAuthorization, adminCancelOrders)
router.get('/complete-orders/:id', adminAuth, hasAuthorization, adminCompleteOrders)
router.get('/dispatch-orders/:id', adminAuth, hasAuthorization, adminDispatchOrders)
router.get('/return-orders/:id', adminAuth, hasAuthorization, adminReturnOrders)
router.get('/tobereturn-orders/:id', adminAuth, hasAuthorization, adminToBeReturnOrders)

// dispatcher's..
router.patch('/toggle-dispatch-order/:order_id',dispatcherAuth,toggleDispatchOrder)//approve/dispatch
router.get('/approved-orders',dispatcherAuth,approvedOrders)
router.get('/tobereturn-orders', dispatcherAuth, dispatcherToBeReturnOrders)
router.patch('/toggle-complete-order-request/:order_id',dispatcherAuth,toggleCompleteOrder)//dispatch/complete
router.patch('/return-order/:order_id', dispatcherAuth, returnOrder)
router.get('/dispatcher-order/:order_id',dispatcherAuth,dispatcherOrder)// get order by dispatcher
//  get orders by status
router.param('id',profile)
router.param('order_id',order)

module.exports = router;