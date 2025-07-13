const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    rating: { type: Number, min: 1, max: 5 },
    notes: String,
    readDate: Date,
});

module.exports = mongoose.model("Book", bookSchema);
