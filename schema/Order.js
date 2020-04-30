const mongoose = require("mongoose");
const Schema = mongoose.Schema
const orderSchema = new mongoose.Schema({
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
    payment: {
        type: Schema.Types.ObjectId,
        ref: "payment",
    },
    quantity: {
        type: Number
    },
    status: {
        type: String,
        enum: ["active", "complete", "canceled"]
    },
    isPaid:{
        type: Boolean
    },
    isDeleted: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);