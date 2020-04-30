const Admin = require("../../models/Admin");
const { sendEmail } = require("../middleware/helpers");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        let adminExists = await Admin.findOne({ email: req.body.email });
        if (adminExists)
            return res.status(403).json({
                error: "Email is taken!"
            });
        let admin = new Admin(req.body);
        // admin.isRegistred = false;
        admin = await admin.save();
        const token = jwt.sign(
            { _id: admin._id },
            process.env.JWT_EMAIL_VERIFICATION_KEY,
            { expiresIn: 60 * 3600 }
        );
        const formData = {
            from: "Ecom",
            to: admin.email,
            subject: "email verification",
            html: `<p>Hi, ${admin.name} . </p></br>
                    <a href="${process.env.EMAIL_REDIRECT_LINK}/email-verify?id=${token}">Click me to register your account</a>`
        };
        await sendEmail(formData)
        res
            .status(200)
            .json({
                msg: `Follow the link provided to ${req.body.email} to verify your email.`
            });
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
};
// verify email link
exports.emailverify = async (req, res) => {
    try {
        const token = req.query.id;
        const decoded = await jwt.verify(
            token,
            process.env.JWT_EMAIL_VERIFICATION_KEY
        );
        if (!decoded) return res.status(401).json({error:'Invalid link'}) 
        await Admin.updateOne(
            { _id: decoded._id },
            { $set: { isRegistred: true } },
            { multi: false }
        );
        res.status(200).json({ msg: "Successfully signup!" });
    } catch (error) {
        res.send(400).json({ error: "Invalid Link!, Please sign up again after 10 minutes" });
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
    admin.salt = undefined
    admin.password = undefined

    const payload = {
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        type: 'admin'
    };
    const token = jwt.sign(
        payload,
        process.env.JWT_SIGNIN_KEY,
        { expiresIn: "10h" }
    );

    return res.json({ token });
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
        throw 'User is not authorized to perform this action'
    } catch (error) {
        res.status(403).json({ error: error })
    }
}