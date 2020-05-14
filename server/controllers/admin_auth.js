const Admin = require("../models/Admin");
const { sendEmail } = require("../middleware/helpers");
const jwt = require("jsonwebtoken");
const _ = require('lodash')
const RefreshToken = require("../models/RefereshToken")

/**
 * @swagger
 *
 * /admin-signup:
 *   post:
 *     description: Admin Signup
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: admin
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: users
 */
exports.signup = async (req, res) => {
    let adminExists = await Admin.findOne({ email: req.body.email });
    if (adminExists)
        return res.status(403).json({
            error: "Email is taken!"
        });
    const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_EMAIL_VERIFICATION_KEY,
        { expiresIn: process.env.EMAIL_TOKEN_EXPIRE_TIME }
    );
    req.body.emailVerifyLink = token
    let admin = new Admin(req.body);
    // await admin.save();
    const mailingData = {
        from: "Ecom",
        to: admin.email,
        subject: "email verification",
        html: `<p>Hi, ${admin.name} . </p></br>
                    <a href="${process.env.ADMIN_CRM_ROUTE}/email-verify?token=${token}">Click me to verify email for your admin account</a>`
    };
    await sendEmail(mailingData)
    res
        .status(200)
        .json({
            msg: `Email has been sent to ${req.body.email} to verify your email address.`
        });
};
// verify email link
exports.emailverify = async (req, res) => {
    const { token } = req.query;
    let admin = await Admin.findOne({ emailVerifyLink: token })
    if (!admin || (admin && !admin.emailVerifyLink ))
        return res.status(401).json({
            error: "Token is invalid!"
        });
    admin.emailVerifyLink = ''
    admin.updated = Date.now()
    await admin.save()
    res.status(201).json({ msg: "Successfully signup!" });
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    let admin = await Admin.findByCredentials(email, password)
    if (!admin) {
        return res.status(404).json({
            error: "Email or password is invalid."
        });
    }
    if (admin.emailVerifyLink) {
        return res.status(401).json({
            error: "Please verify your email address."
        });
    }

    const payload = {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
    };
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SIGNIN_KEY,
        { expiresIn: process.env.SIGNIN_EXPIRE_TIME }
    );
    let refreshToken = { refreshToken: jwt.sign(payload, process.env.REFRESH_TOKEN_KEY) }
    refreshToken = new RefreshToken(refreshToken)
    await refreshToken.save()
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken.refreshToken}; HttpOnly`);
    return res.json({ accessToken });
};
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body
    if (refreshToken == null) return res.status(400).json({ error: " Token is Null" })
    let token = await RefreshToken.findOne({ refreshToken })
    if (!token) return res.status(403).json({ error: "Invalid refresh token" })
    const admin = await jwt.verify(token.refreshToken, process.env.REFRESH_TOKEN_KEY)
    const payload = {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
    };
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SIGNIN_KEY,
        { expiresIn: process.env.SIGNIN_EXPIRE_TIME }
    );
    return res.json({ accessToken });
}
exports.logout = async (req,res) => {
    const {refreshToken} = req.body
    await RefreshToken.deleteOne({refreshToken})
    res.status(200).json({msg:"Logged Out"})
}

exports.forgotPassword = async (req, res) => {
    if (!req.body) return res.status(400).json({ error: "No request body" });
    if (!req.body.email) return res.status(400).json({ error: "No Email in request body" });

    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin)
        return res.status(404).json({
            error: "Admin with that email does not exist!"
        });

    const token = jwt.sign(
        { _id: admin._id },
        process.env.JWT_EMAIL_VERIFICATION_KEY,
        { expiresIn: process.env.EMAIL_TOKEN_EXPIRE_TIME }
    );
    const mailingData = {
        from: "Ecom",
        to: admin.email,
        subject: "Password reset Link",
        html: `<p>Hi, ${admin.name} . </p></br>
                    <a href="${process.env.ADMIN_CRM_ROUTE}/reset-password?token=${token}">Click me to reset your password</a>`
    };

    await admin.updateOne({ resetPasswordLink: token })
    await sendEmail(mailingData)
    res.status(200).json({
        msg: `Email has been sent to ${email}. Follow the instructions to reset your password.`
    })
};

exports.resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    let admin = await Admin.findOne({ resetPasswordLink });
    // if err or no admin
    if (!admin || (admin && !admin.resetPasswordLink ))
        return res.status(404).json({
            error: "Invalid Link!"
        });

    const updatedFields = {
        password: newPassword,
        resetPasswordLink: ""
    };

    admin = _.extend(admin, updatedFields);
    admin.updated = Date.now();

    await admin.save()
    res.json({
        msg: `Great! Now you can login with your new password.`
    });
};

// authentication middleware
exports.auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    try {

        if (token) {
            const user = await parseToken(token)
            if (user._id) {
                const admin = await Admin.findById(user._id).select('-password -salt')
                if (admin) {
                    req.admin = admin
                    return next();
                }
                throw 'Invalid Admin'
            }
            throw user.error
        }
        throw 'Token not found'
    } catch (error) {
        console.log('******AUTH ERROR******');
        console.log(error);
        res.status(401).json({ error: error })
    }
}
function parseToken(token) {
    // console.log('parseToken in admin/auth',token.split(' ')[1]);
    try {
        return jwt.verify(token, process.env.JWT_SIGNIN_KEY);
    } catch (error) {
        return ({ error: error.message });
    }
}

// has authorization middleware
exports.hasAuthorization = async (req, res, next) => {
    try {
        const sameAdmin = req.profile && req.admin && req.profile._id.toString() === req.admin._id.toString()
        const superadmin = req.admin && req.admin.role === 'superadmin'
        const canAccess = superadmin || sameAdmin
        if (canAccess) {
            return next();
        }
        throw 'Admin is not authorized to perform this action'
    } catch (error) {
        res.status(401).json({ error: error })
    }
}
exports.isSuperAdmin = async (req, res, next) => {
    try {
        const isSuperAdmin = req.admin && req.admin.role === 'superadmin'
        if (isSuperAdmin) {
            return next();
        }
        throw 'Unauthorized Admin'
    } catch (error) {
        res.status(401).json({ error: error })
    }
}
exports.isAdmin = async (req, res, next) => {
    try {
        const isAdmin = req.admin && req.admin.role === 'admin'
        if (isAdmin) {
            return next();
        }
        throw 'Unauthorized Admin'
    } catch (error) {
        res.status(401).json({ error: error })
    }
}