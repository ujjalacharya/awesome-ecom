const express = require("express");

const {
    getAllAdmins, flipAdminBankApproval, flipAdminBusinessApproval, flipAdminWarehouseApproval, flipAdminAccountApproval, flipCategoryAvailablity, createCategory, getCategories, approveProduct, disApproveProduct
} = require("../controllers/superadmin");
const { auth, isSuperAdmin } = require('../controllers/admin_auth')

const router = express.Router();

// admin's..
router.get('/admins', auth, isSuperAdmin, getAllAdmins )
router.patch('/flip-admin-business-approval/:b_id',auth,isSuperAdmin,flipAdminBusinessApproval)
router.patch('/flip-admin-bank-approval/:bank_id', auth, isSuperAdmin, flipAdminBankApproval)
router.patch('/flip-admin-warehouse-approval/:w_id', auth, isSuperAdmin, flipAdminWarehouseApproval)
router.patch('/flip-admin-account-approval/:a_id', auth, isSuperAdmin, flipAdminAccountApproval)

// category's..
router.post('/create-category/',auth, isSuperAdmin,createCategory)
router.get('/categories',getCategories)
router.patch('/flip-category-availablity',auth, isSuperAdmin,flipCategoryAvailablity)

// product's..
router.patch('/approve-product/:p_slug',auth,isSuperAdmin,approveProduct)
router.put('/disapprove-product/:p_slug',auth,isSuperAdmin,disApproveProduct)


module.exports = router;