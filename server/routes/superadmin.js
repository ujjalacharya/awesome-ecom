const express = require("express");

const {
    getAllAdmins, flipAdminBankApproval, flipAdminBusinessApproval, flipAdminWarehouseApproval, flipAdminAccountApproval,flipCategoryAvailablity, createCategory, getCategories
} = require("../controllers/superadmin");
const {profile} = require("../controllers/admin")
const { auth, isSuperAdmin } = require('../controllers/admin_auth')

const router = express.Router();

// admin route..
// router
//     .route("/:id")
//     .get(getProfile)

router.get('/admins', auth, isSuperAdmin, getAllAdmins )
router.patch('/flipAdminBusinessApproval/:b_id',auth,isSuperAdmin,flipAdminBusinessApproval)
router.patch('/flipAdminBankApproval/:bank_id', auth, isSuperAdmin, flipAdminBankApproval)
router.patch('/flipAdminWarehouseApproval/:w_id', auth, isSuperAdmin, flipAdminWarehouseApproval)
router.patch('/approve-account/:a_id', auth, isSuperAdmin, flipAdminAccountApproval)

router.post('/create-category/',auth, isSuperAdmin,createCategory)
router.get('/categories',auth, isSuperAdmin,getCategories)
router.patch('/flipCategoryAvailablity',auth, isSuperAdmin,flipCategoryAvailablity)


// router.param('id', profile)

module.exports = router;