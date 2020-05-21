const Professor = require("../models/Professor");
const { sendEmail } = require("../middleware/helpers");
const jwt = require("jsonwebtoken");
const _ = require('lodash')
const RefreshToken = require("../models/RefereshToken")

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    let professor = await Professor.findByCredentials(email, password)
    if (!professor) {
        return res.status(404).json({
            error: "Email or password is invalid."
        });
    }
    const payload = {
        _id: professor._id,
        name: professor.name,
        email: professor.email,
        role: professor.role
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
    const professor = await jwt.verify(token.refreshToken, process.env.REFRESH_TOKEN_KEY)
    const payload = {
        _id: professor._id,
        name: professor.name,
        email: professor.email,
        role: professor.role
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
    const professor = await Professor.findOne({ email });
    if (!professor)
        return res.status(404).json({
            error: "Professor with that email does not exist!"
        });

    const token = jwt.sign(
        { _id: professor._id },
        process.env.JWT_EMAIL_VERIFICATION_KEY,
        { expiresIn: process.env.EMAIL_TOKEN_EXPIRE_TIME }
    );
    const mailingData = {
        from: "Ecom",
        to: professor.email,
        subject: "Password reset Link",
        html: `<p>Hi, ${professor.name} . </p></br>
                    <a href="${process.env.PROFESSOR_CRM_ROUTE}/reset-password?token=${token}">Click me to reset your password</a>`
    };

    await professor.updateOne({ resetPasswordLink: token })
    await sendEmail(mailingData)
    res.status(200).json({
        msg: `Email has been sent to ${email}. Follow the instructions to reset your password.`
    })
};

exports.resetPassword = async (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    let professor = await Professor.findOne({ resetPasswordLink });
    // if err or no professor
    if (!professor || (professor && !professor.resetPasswordLink ))
        return res.status(404).json({
            error: "Invalid Link!"
        });

    const updatedFields = {
        password: newPassword,
        resetPasswordLink: ""
    };

    professor = _.extend(professor, updatedFields);
    professor.updated = Date.now();

    await professor.save()
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
                const professor = await Professor.findById(user._id).select('-password -salt')
                if (professor) {
                    req.professor = professor
                    return next();
                }
                throw 'Invalid Professor'
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
    // console.log('parseToken in professor/auth',token.split(' ')[1]);
    try {
        return jwt.verify(token, process.env.JWT_SIGNIN_KEY);
    } catch (error) {
        return ({ error: error.message });
    }
}

// has authorization middleware
// exports.hasAuthorization = async (req, res, next) => {
//     try {
//         const sameAdmin = req.profile && req.professor && req.profile._id.toString() === req.professor._id.toString()
//         const superadmin = req.professor && req.professor.role === 'superadmin'
//         const canAccess = superadmin || sameAdmin
//         if (canAccess) {
//             return next();
//         }
//         throw 'Professor is not authorized to perform this action'
//     } catch (error) {
//         res.status(401).json({ error: error })
//     }
// }
exports.isProfessor = async (req, res, next) => {
    try {
        const isProfessor = req.professor && req.professor.role === 'professor'
        if (isProfessor) {
            return next();
        }
        throw 'Unauthorized Professor'
    } catch (error) {
        res.status(401).json({ error: error })
    }
}