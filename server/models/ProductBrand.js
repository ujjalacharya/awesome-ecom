const mongoose = require('mongoose');
const modelSchema = new mongoose.Schema({
    brand: [String]

})
module.exports = mongoose.model("productbrand", modelSchema);