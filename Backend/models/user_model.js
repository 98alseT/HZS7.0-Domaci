const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, require: true },
    verified : { type: Boolean, default: false, required: true },
});

const User = mongoose.model('user', userSchema);

module.exports = User;