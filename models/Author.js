const mongoose = require('mongoose');

const AuthorScema = new mongoose.Schema({
    name: String,
    bio: String,
});

module.exports = mongoose.model('Author', AuthorScema);