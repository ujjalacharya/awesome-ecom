exports.validateSignUp = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();
    // email is not null, valid and normalized
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Invalid email")
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.validateBusinessInfo = (req,res, next) => {
    req.check("ownerName","Owner name is required").notEmpty()
    req.check("address", "Address is required").notEmpty()
    req.check("city", "City is required").notEmpty()
    req.check("citizenshipNumber", "Citizenship number is required").notEmpty()
    req.check("businessRegisterNumber", "Business register number is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
exports.validateAdminBankInfo = (req, res, next) => {
    req.check("accountHolder", "Account holder name is required").notEmpty()
    req.check("bankName", "Bank name is required").notEmpty()
    req.check("branchName", "Branch name is required").notEmpty()
    req.check("accountNumber", "Account number is required").notEmpty()
    req.check("routingNumber", "Bank number is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
exports.validateWareHouse = (req,res, next) => {
    req.check("name", "Warehouse name is required").notEmpty()
    req.check("address", "Warehouse address is required").notEmpty()
    req.check("phoneno", "Warehouse phone number is required").notEmpty()
    req.check("city", "City of warehouse is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
exports.validateAdminProfile = (req,res,next) => {
    req.check("shopName", "Shop name is required").notEmpty()
    req.check("address", "address is required").notEmpty()
    req.check("phone", "phone number is required").notEmpty()
    req.check("muncipality", "Muncipality is required").notEmpty()
    req.check("district", "district is required").notEmpty()
    req.check("wardno", "wardno is required").notEmpty()
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next()
}
