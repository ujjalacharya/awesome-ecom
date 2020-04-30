const express = require("express");

const {
    signup,
    signin,
    refreshToken
} = require("../controllers/admin_auth");

const { validateSignUp } = require("..//middleware/validator");

const router = express.Router();

router.post("/signup", validateSignUp, signup);
router.post("/signin", signin);
router.post("/refreshtoken", refreshToken)

module.exports = router;