const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    shopName: {
        type: String,
        trim: true,
        maxlength: 32
    },
    address: {
        type: String,
        trim: true,
        maxlength: 32
    },
    documents: {
        type: Schema.Types.ObjectId,
        ref: "admin"
    },
    phone: {
        type: Number,
        max: 9999999999,
        unique: true
    },
    isVerified: {
        default: false
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    salt: String,
    role: {
        type: String,
        enum: ["admin", "superadmin"],
        default: "admin"
    },
    resetPasswordLink: {
        type: String,
        default: ""
    },
    emailVerifyLink: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Date,
        default: null
    }
}, { timestamps: true });


const sha512 = function (password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        passwordHash: value
    };
};
adminSchema.pre('save', function (next) {
    let admin = this;
    if (admin.isModified('password')) {
        // salt
        const ranStr = function (n) {
            return crypto.randomBytes(Math.ceil(8))
                .toString('hex')
                .slice(0, n);
        };
        // applying sha512 alogrithm
        let salt = ranStr(16);
        let passwordData = sha512(admin.password, salt);
        admin.password = passwordData.passwordHash;
        admin.salt = salt;
        next();
    } else {
        next();
    }
})
adminSchema.statics.findByCredentials = async function (email, password) {
    let Admin = this;
    const admin = await Admin.findOne({ email })
    if (!admin) return ''
    let passwordData = sha512(password, admin.salt)
    if (passwordData.passwordHash == admin.password) {
        return admin
    }
}
module.exports = mongoose.model("admin", adminSchema);