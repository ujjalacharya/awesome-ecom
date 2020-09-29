const mongoose = require('mongoose');
const Schema = mongoose.Schema
const socketMappingSchema = new mongoose.Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "admin",
    },
    socketId: String
});
module.exports = mongoose.model('socketmapping', socketMappingSchema);