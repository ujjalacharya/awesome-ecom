const mongoose = require("mongoose");
// const slug = require("mongoose-slug-updater");
// mongoose.plugin(slug);
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    brand: {
        type:String,
        trim: true,
        maxlength: 32
    },
    quantity: {
        type: Number,
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
    warranty: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    return: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    size: {
        type: String,
        trim: true,
        maxlength: 32
    },
    model: {
        type: String,
        trim: true,
        maxlength: 32
    },
    color: {
        type: String,
        trim: true,
        maxlength: 32
    },
    weight: {
        type: String,
        trim: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    productLarge: [{
        type: String
    }],
    productMedium:{
        type: String
    },
    productThumbnail:{
        type: String
    },
    tags: [{
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
    isVerified: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Date,
        default: null
    },
    slug: {
        type: String,
        unique: true
    }
    // slug: {
    //     type: String,
    //     slug: "brand",
    //     unique: true,
    //     slugPaddingSize: 4
    // }
}, { timestamps: true });
productSchema.plugin(URLSlugs('name', { field: 'slug', update: true }));
module.exports = mongoose.model("product", productSchema);