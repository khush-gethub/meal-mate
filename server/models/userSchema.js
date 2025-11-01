const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rname: String,
    email: String,
    password: String,
   conformPassword: String,
   role: { type: String, default: 'user' } // Added role field with a default value
});

const userModel = mongoose.model('userModel', userSchema, 'users');

module.exports = userModel;
