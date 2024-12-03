const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    numberOfPages: { type: Number, required: true, min: 1 },
    author: { type: String, require: true },
    genre: { type: String, enum: ['thriller', 'sci-fi', 'horror', 'novel'], default: "novel", required: true },
    ratings: { type: [Number], min: 1, max: 5 }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;