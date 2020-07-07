const express = require("express");

const {
    getAdmins, flipAdminBankApproval, flipAdminBusinessApproval, flipAdminWarehouseApproval, flipAdminAccountApproval, flipCategoryAvailablity, category, getCategories, approveProduct, disApproveProduct, blockUnblockAdmin, getProducts, productBrand, getProductBrands, geoLocation, getGeoLocation, shippingData, getShippingData, blockUnblockUser, banner, editBanner, deleteBanner, getBanners, getDeletedBanners, getUsers,  getAllDispatchers, addDispatcher,editDispatcher,blockUnbolckDispatcher
} = require("../controllers/superadmin");
const { auth, isSuperAdmin } = require('../controllers/admin_auth')
const {uploadBannerPhoto} = require("../middleware/helpers")
const { validateDispatcher,validateUpdateDispatcher} = require("../middleware/validator")

const router = express.Router();

//superadmin's..
router.route('/geo-location')
    .put(auth, isSuperAdmin,geoLocation)//create and update
    .get(auth,isSuperAdmin,getGeoLocation)
router.route('/shipping-data')
    .put(auth,isSuperAdmin,shippingData)//create and update
    .get(auth,isSuperAdmin,getShippingData)
router.route('/banner')
    .post(auth,isSuperAdmin,uploadBannerPhoto,banner)//create
    .patch(auth,isSuperAdmin,deleteBanner)//delete
    .put(auth, isSuperAdmin, uploadBannerPhoto, editBanner)//edit
    .get(getBanners)//not deletedBanners
router.get('/deleted-banners', auth, isSuperAdmin, getDeletedBanners)

//user's..
router.patch('/block-unblock-user/:user_id', auth, isSuperAdmin,blockUnblockUser)
router.get('/users', auth, isSuperAdmin, getUsers)


// admin's..
router.get('/admins', auth, isSuperAdmin, getAdmins)
router.patch('/flip-admin-business-approval/:b_id', auth, isSuperAdmin, flipAdminBusinessApproval)
router.patch('/flip-admin-bank-approval/:bank_id', auth, isSuperAdmin, flipAdminBankApproval)
router.patch('/flip-admin-warehouse-approval/:w_id', auth, isSuperAdmin, flipAdminWarehouseApproval)
router.patch('/flip-admin-account-approval/:a_id', auth, isSuperAdmin, flipAdminAccountApproval)
router.patch('/block-unblock-admin/:id',auth,isSuperAdmin,blockUnblockAdmin)

//dispatcher's..
router.get('/dispatchers', auth,isSuperAdmin, getAllDispatchers)
router.post('/add-dispatcher', auth,isSuperAdmin,validateDispatcher,addDispatcher)
router.put('/update-dispatcher', auth, isSuperAdmin, validateUpdateDispatcher,editDispatcher)
router.patch('/block-unblock-dispatcher/:dispatcher_id',auth,isSuperAdmin,blockUnbolckDispatcher)


// category's..
router.put('/product-category', auth, isSuperAdmin, category)//create and update
router.get('/product-categories', getCategories)
router.patch('/flip-category-availablity', auth, isSuperAdmin, flipCategoryAvailablity)

// brand's..
router.put('/product-brand',auth,isSuperAdmin,productBrand)//create and update
router.get('/product-brands',getProductBrands)

// product's..
router.patch('/approve-product/:p_slug', auth, isSuperAdmin, approveProduct)
router.put('/disapprove-product/:p_slug', auth, isSuperAdmin, disApproveProduct)
router.get("/products", auth, isSuperAdmin, getProducts)


module.exports = router;