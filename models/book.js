const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class Book {
	constructor(title, author, addedAt, finishedAt, score, status, id) {
		this.title = title;
		this.author = author;
		this.addedAt = addedAt;
		this.finishedAt = finishedAt;
		this.score = score;
		this.status = status;
		this._id = id;
	}

	save() {
		const db = getDb();
		let dbOperation;
		if (this._id) {
			dbOperation = db.collection('books').updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: { title: this.title, author: this.author, addedAt: this.addedAt, finishedAt: this.finishedAt, score: this.score, status: this.status }});
		} else {
			dbOperation = db.collection('books').insertOne(this);
		}
		return dbOperation
			.then(result => {
				console.log(result);
			})
			.catch(err => console.log(err));
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('books')
			.find()
			.toArray()
			.then(rows => {
				return rows;
			})
			.catch(err => console.log(err));
	}

	static findById(bookId) {
		const db = getDb();
		return db.collection('books')
			.find({ _id: new mongoDb.ObjectId(bookId) })
			.next()
			.then(rows => {
				return rows;
			})
			.catch(err => console.log(err));
	}
}

module.exports = Book;
