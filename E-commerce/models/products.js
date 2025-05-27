const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    prdname: String,
    prddecs: String,
    prdprice: Number,
    prdimg: String
})

module.exports = mongoose.model('product', productsSchema);