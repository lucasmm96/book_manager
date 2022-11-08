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

userSchema.methods.addBook = function (bookId, addedAt, finishedAt, score, status) {
	const userBook = {
		_id: bookId,
		addedAt: addedAt,
		finishedAt: finishedAt,
		score: score,
		status: status
	}
	this.books.push(userBook);
	return this.save();
};

userSchema.methods.removeBook = function (bookId) {
	const udpdatedBookList = this.books.filter(book => {
		return book._id.toString() !== bookId.toString();
	});
	this.books = udpdatedBookList;
	return this.save();
}

module.exports = mongoose.model('User', userSchema);
