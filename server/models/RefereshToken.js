const mongoose = require('mongoose');
const tokenSchema = mongoose.Schema({
    refreshToken:{type: String,
    default: ''}
});
module.exports = mongoose.model('refreshtoken', tokenSchema);