const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
});

const Token = mongoose.model('refresh_tokens', tokenSchema);

module.exports = Token;