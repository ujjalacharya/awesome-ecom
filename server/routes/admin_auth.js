const express = require("express");

const {
    signup,
    signin,
    emailverify,
    resetPassword,
    forgotPassword,
    refreshToken,
    logout
} = require("../controllers/admin_auth");

const { validateSignUp, passwordResetValidator } = require("../middleware/validator");

const router = express.Router();

router.post("/signup", validateSignUp, signup);
router.post("/signin", signin);
router.put('/email-verify',emailverify)
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);
router.post("/refresh-token",refreshToken)
router.delete("/logout", logout)

module.exports = router;