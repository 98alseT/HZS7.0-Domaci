const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    verified: { type: Boolean, default: false, required: true },
    profilePicture: { type: String, required: false } //Pamtimo URL slike koja se cuva na serveru ne u databazi
});

const User = mongoose.model('user', userSchema);

module.exports = User;
