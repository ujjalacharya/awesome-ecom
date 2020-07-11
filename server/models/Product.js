const mongoose = require("mongoose");
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 128
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'productbrand'
    },
    quantity: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }],
    soldBy: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'productimages'
    }],
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
    size: [{
        type: String,
        trim: true,
        maxlength: 32
    }],
    model: {
        type: String,
        trim: true,
        maxlength: 128
    },
    color: [{
        type: String,
        trim: true,
        maxlength: 128
    }],
    weight: [{
        type: String,
        trim: true,
        maxlength: 128
    }],
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
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
    },
    remark: {
        type: Schema.Types.ObjectId,
        ref: 'remark'
    },
}, { timestamps: true });
productSchema.plugin(URLSlugs('name', { field: 'slug', update: true }));
module.exports = mongoose.model("product", productSchema);