const express = require("express");

const {
    getAllAdmins, approveAdminBank,approveAdminBusiness,approveAdminWarehouse,approveAdminAccount
} = require("../controllers/superadmin");
const {profile} = require("../controllers/admin")
const { auth, isSuperAdmin } = require('../controllers/admin_auth')

const router = express.Router();

// admin route..
// router
//     .route("/:id")
//     .get(getProfile)

router.get('/admins', auth, isSuperAdmin, getAllAdmins )
router.put('/approve-business-info/:b_id',auth,isSuperAdmin,approveAdminBusiness)
router.put('/approve-bank-info/:bank_id', auth, isSuperAdmin, approveAdminBank)
router.put('/approve-warehouse-info/:w_id', auth, isSuperAdmin, approveAdminWarehouse)
router.put('/approve-account/:a_id', auth, isSuperAdmin, approveAdminAccount)


// router.param('id', profile)

module.exports = router;