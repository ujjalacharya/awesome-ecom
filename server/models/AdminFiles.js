const mongoose = require('mongoose');
const adminFileSchema = mongoose.Schema({
    fileUri: String
}, { timestamps: true });
module.exports = mongoose.model('adminfile', adminFileSchema);