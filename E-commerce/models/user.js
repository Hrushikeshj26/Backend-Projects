const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contactno: Number,
    address: String,
    image: String
})


module.exports = mongoose.model('user', userSchema);