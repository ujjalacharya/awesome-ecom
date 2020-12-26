const mongoose = require("mongoose");
const Schema = mongoose.Schema
const miningSchema = new mongoose.Schema({
    trending: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        unique: true
    }],
    featured: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        unique: true
    }],
    topSelling: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        unique: true
    }],
    forYou: [{
        user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        unique: true
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'product',
            unique: true
        }]
    }]
});

module.exports = mongoose.model("minedproduct", miningSchema);