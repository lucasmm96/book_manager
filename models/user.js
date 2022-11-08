const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	books: [
		{
			_id: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
			addedAt: { type: Date, required: true },
			finishedAt: { type: Date, required: false },
			score: { type: Number, required: false },
			status: { type: String, required: false }
		}
	]
});

userSchema.methods.addBook = function(book, addedAt, finishedAt, score, status) {
	const userBook = {
		_id: book._id,
		addedAt: addedAt,
		finishedAt: finishedAt,
		score: score,
		status: status
	}
	console.log(userBook);
	this.books.push(userBook);
	return this.save();
};

module.exports = mongoose.model('User', userSchema);
