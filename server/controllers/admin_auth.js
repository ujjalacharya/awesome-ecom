const Admin = require("../models/Admin");
const { sendEmail } = require("../middleware/helpers");
const jwt = require("jsonwebtoken");
const _ = require('lodash')

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
    try {
        let adminExists = await Admin.findOne({ email: req.body.email });
        if (adminExists)
            return res.status(403).json({
                error: "Email is taken!"
            });
        const token = jwt.sign(
            {email: req.body.email },
            process.env.JWT_EMAIL_VERIFICATION_KEY,
            { expiresIn: '1h' }
            );
        req.body.emailVerifyLink=token
        console.log(req.body);
        let admin = new Admin(req.body);
        await admin.save();
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
    } catch (error) {
        console.log('ADMIN_SIGNUP_ERROR==>', error);
        res
            .status(500)
            .json({ error: error.message });
    }
};
// verify email link
exports.emailverify = async (req, res) => {
    try {
        const { token } = req.query;
        let admin = await Admin.findOne({ emailVerifyLink: token })
        if (!admin)
            return res.status(401).json({
                error: "Token is invalid!"
            });
        admin.emailVerifyLink = ''
        admin.updated = Date.now()
        await admin.save()
        res.status(200).json({ msg: "Successfully signup!" });
    } catch (error) {
        console.log('ADMIN_EMAIL_VERIFY_ERROR==>', error);
        res.status(500).json({ error: error.message });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    let admin = await Admin.findByCredentials(email, password)
    if (!admin) {
        return res.status(400).json({
            error: "Admin with that email does not exist."
        });
    }
    if (admin.emailVerifyLink !== '') {
        return res.status(400).json({
            error: "Please verify your email address."
        });
    }

    const payload = {
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
    };
    const token = jwt.sign(
        payload,
        process.env.JWT_SIGNIN_KEY,
        { expiresIn: "10h" }
    );

    return res.json({ token });
};

exports.socialLogin = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            // create a new admin and login
            admin = new Admin(req.body);
            admin = await admin.save();
            req.admin = admin;
            const payload = {
                _id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SIGNIN_KEY,
                { expiresIn: "10h" }
            );
            return res.json({ token });
        } else {
            // update existing admin with new social info and login

            admin = _.extend(admin, req.body);
            admin = await admin.save();
            req.admin = admin;
            const payload = {
                _id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            };
            const token = jwt.sign(
                payload,
                process.env.JWT_SIGNIN_KEY,
                { expiresIn: "10h" }
            );
            return res.json({ token });
        }
    } catch (error) {
        console.log('SOCIAL_LOGIN_ERROR==>', error);
        res.status(500).json({ error: error.message });
    }

};

exports.forgotPassword = async (req, res) => {
    if (!req.body) return res.status(400).json({ error: "No request body" });
    if (!req.body.email) return res.status(400).json({ error: "No Email in request body" });

    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin)
        return res.status(401).json({
            error: "Admin with that email does not exist!"
        });

    const token = jwt.sign(
        { _id: admin._id },
        process.env.JWT_EMAIL_VERIFICATION_KEY,
        { expiresIn: '1h' }
    );
    const mailingData = {
        from: "Ecom",
        to: admin.email,
        subject: "Password reset Link",
        html: `<p>Hi, ${admin.name} . </p></br>
                    <a href="${process.env.ADMIN_CRM_ROUTE}/reset-password?token=${token}">Click me to reset your password</a>`
    };

    return admin.updateOne({ resetPasswordLink: token }, (err, success) => {
        if (err) {
            return res.status(400).json({ error: err });
        } else {
            return sendEmail(mailingData).then(() => res.status(200).json({
                msg: `Email has been sent to ${email}. Follow the instructions to reset your password.`
            })).catch(error => res.status(500).json({ error: error.message }));
        }
    });
};

exports.resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    let admin = await Admin.findOne({ resetPasswordLink });
    // if err or no admin
    if (!admin)
        return res.status(401).json({
            error: "Invalid Link!"
        });

    const updatedFields = {
        password: newPassword,
        resetPasswordLink: ""
    };

    admin = _.extend(admin, updatedFields);
    admin.updated = Date.now();

    admin.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            msg: `Great! Now you can login with your new password.`
        });
    });
};

// authentication middleware
exports.auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    try {

        if (token) {
            const admin = await parseToken(token)
            if (admin._id) {
                const admin = await Admin.findById(admin._id).select('-password -salt')
                if (admin) {
                    req.admin = admin
                    return next();
                }
                throw 'Invalid Admin'
            }
            throw admin.error
        }
        throw 'Token not found'
    } catch (error) {
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
        if (sameAdmin) {
            return next();
        }
        throw 'Admin is not authorized to perform this action'
    } catch (error) {
        res.status(403).json({ error: error })
    }
}