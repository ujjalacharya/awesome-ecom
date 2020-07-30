const express = require("express");

const {
    signup,
    signin,
    emailverify,
    resetPassword,
    forgotPassword,
    refreshToken,
    auth,
    logout,
    loadMe
} = require("../controllers/admin_auth");

const { validateSignUp, passwordResetValidator } = require("../middleware/validator");

const router = express.Router();

router.post("/signup", validateSignUp, signup);
router.post("/signin", signin);
router.get("/load-me",auth,loadMe)
router.put('/email-verify',emailverify)
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);
router.post("/refresh-token",refreshToken)

module.exports = router;