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
    soldBy:{
        type: Schema.Types.ObjectId,
        ref:"admin"
    },
    status: {
        currentStatus: {
            type: String,
            enum: ["active","approve","dispatch","cancel","complete","return"]
        },
        activeDate: {
            type: Date,
            default: null
        },
        approvedDate: {
            type: Date,
            default: null
        },
        dispatchedDate: {
            type: Date,
            default: null
        },
        cancelledDetail: {
            cancelledDate:{
                type: Date,
                default: null
            },
            cancelledBy:{
                type: Schema.Types.ObjectId,
                refPath: "cancelledByModel"
            },
            remark: {
                type: Schema.Types.ObjectId,
                ref: 'remark'
            },
        },
        completedDate: {
            type: Date,
            default: null
        },
        returnedDetail: {
            returnedDate: {
                type: Date,
                default: null
            },
            remark: {
                type: Schema.Types.ObjectId,
                ref: 'remark'
            },
        },
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    cancelledByModel: {
        type: String,
        enum: ['user', 'admin']
    },
    productAttributes:{
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);