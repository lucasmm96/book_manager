const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	addedAt: { type: Date, required: true },
	finishedAt: { type: Date, required: false },
	score: { type: Number, required: false },
	status: { type: String, required: false }
});

module.exports = mongoose.model('Book', bookSchema);
