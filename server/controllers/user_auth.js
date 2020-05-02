const User = require("../models/User");
const { sendEmail } = require("../middleware/helpers");
const jwt = require("jsonwebtoken");
const _ = require('lodash')

exports.signup = async (req, res) => {
    let userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        return res.status(403).json({
            error: "Email is taken!"
        });
    const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_EMAIL_VERIFICATION_KEY,
        { expiresIn: '1h' }
    );
    req.body.emailVerifyLink = token
    console.log(req.body);
    let user = new User(req.body);
    await user.save();
    const mailingData = {
        from: "Ecom",
        to: user.email,
        subject: "email verification",
        html: `<p>Hi, ${user.name} . </p></br>
                    <a href="${process.env.CLIENT_URL}/email-verify?token=${token}">Click me to verify email for your user account</a>`
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
    let user = await User.findOne({ emailVerifyLink: token })
    if (!user || (user && user.emailVerifyLink === ''))
        return res.status(401).json({
            error: "Token is invalid!"
        });
    user.emailVerifyLink = ''
    user.updated = Date.now()
    await user.save()
    res.status(200).json({ msg: "Successfully signup!" });
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findByCredentials(email, password)
    if (!user) {
        return res.status(400).json({
            error: "User with that email does not exist."
        });
    }
    if (user.emailVerifyLink !== '') {
        return res.status(400).json({
            error: "Please verify your email address."
        });
    }

    const payload = {
        _id: user.id,
        name: user.name,
        email: user.email
    };
    const token = jwt.sign(
        payload,
        process.env.JWT_SIGNIN_KEY,
        { expiresIn: "10h" }
    );

    return res.json({ token });
};

exports.socialLogin = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        // create a new user and login
        user = new User(req.body);
        user = await user.save();
        req.user = user;
        const payload = {
            _id: user.id,
            name: user.name,
            email: user.email
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SIGNIN_KEY,
            { expiresIn: "10h" }
        );
        return res.json({ token });
    } else {
        // update existing user with new social info and login

        user = _.extend(user, req.body);
        user = await user.save();
        req.user = user;
        const payload = {
            _id: user.id,
            name: user.name,
            email: user.email
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SIGNIN_KEY,
            { expiresIn: "10h" }
        );
        return res.json({ token });
    }

};

exports.forgotPassword = async (req, res) => {
    if (!req.body) return res.status(400).json({ error: "No request body" });
    if (!req.body.email) return res.status(400).json({ error: "No Email in request body" });

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(401).json({
            error: "User with that email does not exist!"
        });

    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_EMAIL_VERIFICATION_KEY,
        { expiresIn: '1h' }
    );
    const mailingData = {
        from: "Ecom",
        to: user.email,
        subject: "Password reset Link",
        html: `<p>Hi, ${user.name} . </p></br>
                    <a href="${process.env.CLIENT_URL}/reset-password?token=${token}">Click me to reset your password</a>`
    };

    await user.updateOne({ resetPasswordLink: token })
    await sendEmail(mailingData)
    res.status(200).json({
        msg: `Email has been sent to ${email}. Follow the instructions to reset your password.`
    })
};

exports.resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    let user = await User.findOne({ resetPasswordLink });
    // if err or no user
    if (!user || (user && user.resetPasswordLink === ''))
        return res.status(401).json({
            error: "Invalid Link!"
        });

    const updatedFields = {
        password: newPassword,
        resetPasswordLink: ""
    };

    user = _.extend(user, updatedFields);
    user.updated = Date.now();

    await user.save()
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
                const user = await User.findById(user._id).select('-password -salt')
                if (user) {
                    req.user = user
                    return next();
                }
                throw 'Invalid User'
            }
            throw user.error
        }
        throw 'Token not found'
    } catch (error) {
        res.status(401).json({ error: error })
    }
}
function parseToken(token) {
    // console.log('parseToken in user/auth',token.split(' ')[1]);
    try {
        return jwt.verify(token, process.env.JWT_SIGNIN_KEY);
    } catch (error) {
        return ({ error: error.message });
    }
}

// has authorization middleware
exports.hasAuthorization = async (req, res, next) => {
    try {
        const sameAdmin = req.profile && req.user && req.profile._id.toString() === req.user._id.toString()
        if (sameAdmin) {
            return next();
        }
        throw 'User is not authorized to perform this action'
    } catch (error) {
        res.status(403).json({ error: error })
    }
}