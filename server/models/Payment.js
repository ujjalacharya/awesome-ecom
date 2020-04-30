const mongoose = require("mongoose");
const Schema = mongoose.Schema
const paymentSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    method: {
        type: String,
        enum: ['Cash on Delivery','manual','khalti']
    },
    amount: {
        type: Number,
        required: true
    },
    transactionCode: {
        type: String,
        required: true,
        unique: true
    },
    from:{
        type:Number,
        max: 9999999999 //!esewa && receiverNumber
    },
    isDeleted: {
        type: Date,
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model("appointment", paymentSchema);