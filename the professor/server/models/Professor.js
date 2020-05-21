const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema
const professorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    address: {
        type: String,
        trim: true,
        maxlength: 32
    },
    phone: {
        type: Number,
        max: 9999999999
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
        default: "professor"
    },
    resetPasswordLink: {
        type: String,
        default: ""
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
professorSchema.pre('save', function (next) {
    let professor = this;
    if (professor.isModified('password')) {
        // salt
        const ranStr = function (n) {
            return crypto.randomBytes(Math.ceil(8))
                .toString('hex')
                .slice(0, n);
        };
        // applying sha512 alogrithm
        let salt = ranStr(16);
        let passwordData = sha512(professor.password, salt);
        professor.password = passwordData.passwordHash;
        professor.salt = salt;
        next();
    } else {
        next();
    }
})
professorSchema.statics.findByCredentials = async function (email, password) {
    let Professor = this;
    const professor = await Professor.findOne({ email })
    if (!professor) return ''
    let passwordData = sha512(password, professor.salt)
    if (passwordData.passwordHash == professor.password) {
        return professor
    }
}
module.exports = mongoose.model("professor", professorSchema);