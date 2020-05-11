const mongoose = require("mongoose");
const Schema = mongoose.Schema
const bankSchema = new mongoose.Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
    accountHolder: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    bankName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    branchName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    accountNumber: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    routingNumber: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    chequeCopy: {
        type: String
    },
    isVerified: {
        type: Date,//as we may need verified date
        default: null
    },
    isDeleted: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("adminbank", bankSchema);