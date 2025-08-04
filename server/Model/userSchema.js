const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rname: String,
    email: String,
    password: String,
    conpass: String
});

const userModel = mongoose.model('users', userSchema, 'users');

module.exports = userModel;