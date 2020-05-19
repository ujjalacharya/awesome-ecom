const mongoose = require('mongoose');
const productImageSchema = mongoose.Schema({
    thumbnail: {
        type: String
    },
    medium: {
        type: String
    },
    large: {
        type:String
    }
}, { timestamps: true });
module.exports = mongoose.model('productimages', productImageSchema);