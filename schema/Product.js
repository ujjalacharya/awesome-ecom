const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    soldBy: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    },
    description: [{
        size: {
            type: String
        },
        color: {
            type: String
        },
        warranty: {
            type: String
        },
        return: {
            type: String
        },
        weight: {
            type: String
        },
        other:{
            type: String
        }
    }],
    images: [{
        type: String
    }],
    price: {
        type: Number,
        required:true
    },
    discountRate: {
        type: Number,//it may b float as well..
        default:0
    },
    shipingCharge:{
        type: Number
    },
    videoURL:[{
        type:String
    }],
    isDeleted: {
        type: Date,
        default: null
    },
    slug: {
        type: String,
        slug: "name",
        unique: true,
    }
}, { timestamps: true });//updated pani ho?

module.exports = mongoose.model("product", productSchema);