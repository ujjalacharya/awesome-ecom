const mongoose = require("mongoose");
const Schema = mongoose.Schema
const categorySchema = new mongoose.Schema({
    systemName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    displayName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    isDisabled: {
        type: Date,
        default:null
    }
});

module.exports = mongoose.model("category", categorySchema);