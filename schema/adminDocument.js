const mongoose = require("mongoose");
const Schema = mongoose.Schema
const documentSchema = new mongoose.Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
    citizenshipNumber: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    panID: {
        type: String,
        trim: true,
        maxlength: 32
    },
    VATNo:{
        type: String,
        trim: true,
        maxlength: 32
    },
    vatClearance: {
        type: String
    },
    pan:{
        type:String
    },
    citizenship: {
        type:String
    },
    businessLicence:[{
        type: String
    }],
    companyRegister:[{
        type:String
    }],
    ourAgreement: [{
        type: String
    }],
    isVerified:{
        type: Date,//as we may need verified date
        default: null
    },
    isDeleted: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("admindocument", documentSchema);