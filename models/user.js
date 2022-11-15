const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true  },
	resetToken: { type: String, required: false  },
	resetTokenExpiration: { type: Date, required: false  },
	books: [
		{
			id: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
			addedAt: { type: Date, required: true },
			finishedAt: { type: Date, required: false },
			score: { type: Number, required: false },
			status: { type: String, required: false },
		},
	],
});

userSchema.methods.addBook = function (
	bookId,
	addedAt,
	finishedAt,
	score,
	status
) {
	const newBook = {
		id: bookId,
		addedAt: addedAt,
		finishedAt: finishedAt,
		score: score,
		status: status,
	};
	this.books.push(newBook);
	return this.save();
};

userSchema.methods.updateBook = function (
	bookIndex,
	finishedAt,
	score,
	status
) {
	this.books[bookIndex].finishedAt = finishedAt;
	this.books[bookIndex].score = score;
	this.books[bookIndex].status = status;
	return this.save();
};

userSchema.methods.removeBook = function (bookId) {
	const udpdatedBookList = this.books.filter((filteredItem) => {
		return filteredItem.id.toString() !== bookId.toString();
	});
	this.books = udpdatedBookList;
	return this.save();
};

module.exports = mongoose.model('User', userSchema);
