const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rname: String,
    email: String,
    password: String,
   conformPassword: String
});

const userModel = mongoose.model('userModel', userSchema, 'users');

module.exports = userModel;
