const Dispatcher = require("../models/Dispatcher");
const { sendEmail } = require("../middleware/helpers");
const jwt = require("jsonwebtoken");
const _ = require('lodash')
const RefreshToken = require("../models/RefereshToken")

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    // const email = 'dispatcher1@gmail.com'
    // const password = 'helloworld1'
    // const name = 'dispatcher'
    // const address = 'Dhangadhi-2'
    // const phone = 9868743292
    // let dispatcher = new Dispatcher({email,password,name,address,phone})
    // dispatcher = await dispatcher.save()
    let dispatcher = await Dispatcher.findByCredentials(email, password)
    if (!dispatcher) {
        return res.status(404).json({
            error: "Email or password is invalid."
        });
    }
    const payload = {
        _id: dispatcher._id,
        name: dispatcher.name,
        email: dispatcher.email
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
    const dispatcher = await jwt.verify(token.refreshToken, process.env.REFRESH_TOKEN_KEY)
    const payload = {
        _id: dispatcher._id,
        name: dispatcher.name,
        email: dispatcher.email
    };
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SIGNIN_KEY,
        { expiresIn: process.env.SIGNIN_EXPIRE_TIME }
    );
    return res.json({ accessToken });
}

exports.forgotPassword = async (req, res) => {
    if (!req.body) return res.status(400).json({ error: "No request body" });
    if (!req.body.email) return res.status(400).json({ error: "No Email in request body" });

    const { email } = req.body;
    const dispatcher = await Dispatcher.findOne({ email });
    if (!dispatcher)
        return res.status(404).json({
            error: "Dispatcher with that email does not exist!"
        });

    const token = jwt.sign(
        { _id: dispatcher._id },
        process.env.JWT_EMAIL_VERIFICATION_KEY,
        { expiresIn: process.env.EMAIL_TOKEN_EXPIRE_TIME }
    );
    const mailingData = {
        from: "Ecom",
        to: dispatcher.email,
        subject: "Password reset Link",
        html: `<p>Hi, ${dispatcher.name} . </p></br>
                    <a href="${process.env.ADMIN_CRM_ROUTE}/reset-password?token=${token}">Click me to reset your password</a>`
    };

    await dispatcher.updateOne({ resetPasswordLink: token })
    await sendEmail(mailingData)
    res.status(200).json({
        msg: `Email has been sent to ${email}. Follow the instructions to reset your password.`
    })
};

exports.resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    let dispatcher = await Dispatcher.findOne({ resetPasswordLink });
    // if err or no dispatcher
    if (!dispatcher || (dispatcher && !dispatcher.resetPasswordLink ))
        return res.status(404).json({
            error: "Invalid Link!"
        });

    const updatedFields = {
        password: newPassword,
        resetPasswordLink: ""
    };

    dispatcher = _.extend(dispatcher, updatedFields);
    dispatcher.updated = Date.now();

    await dispatcher.save()
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
                const dispatcher = await Dispatcher.findById(user._id).select('-password -salt')
                if (dispatcher) {
                    if (!dispatcher.isBlocked) {
                        req.dispatcher = dispatcher
                        return next();
                    }
                    throw 'Your account has been blocked'
                }
                throw 'Invalid Dispatcher'
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
    // console.log('parseToken in dispatcher/auth',token.split(' ')[1]);
    try {
        return jwt.verify(token, process.env.JWT_SIGNIN_KEY);
    } catch (error) {
        return ({ error: error.message });
    }
}