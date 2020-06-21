const express = require("express");

const {
    getAllAdmins, flipAdminBankApproval, flipAdminBusinessApproval, flipAdminWarehouseApproval, flipAdminAccountApproval, flipCategoryAvailablity, category, getCategories, approveProduct, disApproveProduct, verifiedProducts, notDeletedProducts, notVerifiedProducts, deletedProducts, blockUnblockAdmin, getVerifiedAdmins, getUnverifiedAdmins, getBlockedAdmins, getNotBlockedAdmins, getProducts, productBrand, getProductBrands, geoLocation, getGeoLocation, shippingRate, getShippingRate, blockUnblockUser, banner, deleteBanner, getBanners, getDeletedBanners
} = require("../controllers/superadmin");
const { auth, isSuperAdmin } = require('../controllers/admin_auth')
const {uploadBannerPhoto} = require("../middleware/helpers")

const router = express.Router();

//superadmin's..
router.route('/geo-location')
    .put(auth, isSuperAdmin,geoLocation)//create and update
    .get(auth,isSuperAdmin,getGeoLocation)
router.route('/shipping-rate')
    .put(auth,isSuperAdmin,shippingRate)//create and update
    .get(auth,isSuperAdmin,getShippingRate)
router.route('/banner')
    .post(auth,isSuperAdmin,uploadBannerPhoto,banner)//create
    .patch(auth,isSuperAdmin,deleteBanner)//delete
    .get(auth,isSuperAdmin,getBanners)//not deletedBanners
router.get('/deleted-banners', auth, isSuperAdmin, getDeletedBanners)

//user's..
router.patch('/block-unblock-user/:user_id', auth, isSuperAdmin,blockUnblockUser)


// admin's..
router.get('/admins', auth, isSuperAdmin, getAllAdmins)
router.patch('/flip-admin-business-approval/:b_id', auth, isSuperAdmin, flipAdminBusinessApproval)
router.patch('/flip-admin-bank-approval/:bank_id', auth, isSuperAdmin, flipAdminBankApproval)
router.patch('/flip-admin-warehouse-approval/:w_id', auth, isSuperAdmin, flipAdminWarehouseApproval)
router.patch('/flip-admin-account-approval/:a_id', auth, isSuperAdmin, flipAdminAccountApproval)
router.patch('/block-unblock-admin/:id',auth,isSuperAdmin,blockUnblockAdmin)
router.get('/verified-admins',auth,isSuperAdmin,getVerifiedAdmins)
router.get('/unverified-admins', auth, isSuperAdmin, getUnverifiedAdmins)
router.get('/blocked-admins', auth, isSuperAdmin, getBlockedAdmins)
router.get('/unblocked-admins', auth, isSuperAdmin, getNotBlockedAdmins)

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
router.get("/verified-products", auth, isSuperAdmin, verifiedProducts)
router.get("/unverified-products", auth, isSuperAdmin, notVerifiedProducts)
router.get("/deleted-products", auth, isSuperAdmin, deletedProducts)
router.get("/not-deleted-products", auth, isSuperAdmin, notDeletedProducts)


module.exports = router;