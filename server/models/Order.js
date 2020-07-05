const mongoose = require("mongoose");
const Schema = mongoose.Schema
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number]
    }
});
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
            enum: ["active","approve","dispatch","cancel","complete","tobereturned","return"]
        },
        activeDate: {
            type: Date,
            default: null
        },
        approvedDate: {
            type: Date,
            default: null
        },
        dispatchedDetail: {
            dispatchedDate: {
                type: Date,
                default: null
            },
            dispatchedBy: {
                type: Schema.Types.ObjectId,
                ref: 'dispatcher'
            },
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
        tobereturnedDate: {
            type: Date,
            default: null
        },
        returnedDetail: {
            returnedDate: {
                type: Date,
                default: null
            },
            returneddBy: {
                type: Schema.Types.ObjectId,
                ref: 'dispatcher'
            },
            remark: {
                type: Schema.Types.ObjectId,
                ref: 'remark'
            },
        },
    },
    shipto:{
        region: {//pradesh
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        area: {//tole,area name
            type: String,
            trim: true,
        },
        address: {//street level address
            type: String,
            trim: true,
        },
        geolocation: {
            type: pointSchema,
        },
        phoneno: {
            type: String,
            trim: true,
            max: 9999999999,
        }
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
orderSchema.index({ geolocation: "2dsphere" });

module.exports = mongoose.model("order", orderSchema);