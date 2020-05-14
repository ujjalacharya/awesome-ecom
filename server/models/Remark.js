const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const remarkSchema = mongoose.Schema({
    comment: {
        type: String
    },
    isDeleted: {
        type: Date,
        default: null
    }
}, { timestamps: true });
module.exports = mongoose.model('remark', remarkSchema);