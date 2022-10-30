const getDb = require('../util/database').getDb;

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
		const db = getDb();
		return db.collection('books')
			.insertOne(this)
			.then(result => {
				console.log(result);
			})
			.catch(err => console.log(err));
	}
	
	static fetchAll() {
		const db = getDb();
		return db.collection('books')
			.find()
			.toArray()
			.then(rows => {
				return rows;
			})
			.catch(err => console.log(err));
	}
}

module.exports = Book;
