const mongoConnect = require('../util/database');

class Book {
	constructor(title, author, addedAt, finishedAt, score, status) {
		this.title = title;
		this.author = author;
		this.addedAt = addedAt;
		this.finishedAt = finishedAt;
		this.score = score;
		this.status = status;
	}
	
	save() {
		
	}
}

module.exports = Book;
