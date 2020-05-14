const express = require("express");

const {
    getAllAdmins, flipAdminBankApproval, flipAdminBusinessApproval, flipAdminWarehouseApproval, flipAdminAccountApproval,flipCategoryAvailablity, createCategory, getCategories
} = require("../controllers/superadmin");
const { auth, isSuperAdmin } = require('../controllers/admin_auth')

const router = express.Router();

router.get('/admins', auth, isSuperAdmin, getAllAdmins )
router.patch('/flipAdminBusinessApproval/:b_id',auth,isSuperAdmin,flipAdminBusinessApproval)
router.patch('/flipAdminBankApproval/:bank_id', auth, isSuperAdmin, flipAdminBankApproval)
router.patch('/flipAdminWarehouseApproval/:w_id', auth, isSuperAdmin, flipAdminWarehouseApproval)
router.patch('/flipAdminAccountApproval/:a_id', auth, isSuperAdmin, flipAdminAccountApproval)

router.post('/create-category/',auth, isSuperAdmin,createCategory)
router.get('/categories',getCategories)
router.patch('/flipCategoryAvailablity',auth, isSuperAdmin,flipCategoryAvailablity)

module.exports = router;