const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	addedAt: { type: Date, required: true },
	finishedAt: { type: Date, required: false },
	score: { type: Number, required: false },
	status: { type: String, required: false }
});

module.exports = mongoose.model('Book', productSchema);

// const mongoDb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Book {
// 	constructor(title, author, addedAt, finishedAt, score, status, id, userId) {
// 		this.title = title;
// 		this.author = author;
// 		this.addedAt = addedAt;
// 		this.finishedAt = finishedAt;
// 		this.score = score;
// 		this.status = status;
// 		this._id = id ? mongoDb.ObjectId(id) : null;
// 		this.userId = userId;
// 	}

// 	save() {
// 		const db = getDb();
// 		let dbOperation;
// 		if (this._id) {
// 			dbOperation = db.collection('books').updateOne({ _id: this._id }, { $set: this });
// 		} else {
// 			dbOperation = db.collection('books').insertOne(this);
// 		}
// 		return dbOperation
// 			.then(result => {
// 				console.log(result);
// 			})
// 			.catch(err => console.log(err));
// 	}

// 	static fetchAll() {
// 		const db = getDb();
// 		return db
// 			.collection('books')
// 			.find()
// 			.toArray()
// 			.then(rows => {
// 				return rows;
// 			})
// 			.catch(err => console.log(err));
// 	}

// 	static findById(bookId) {
// 		const db = getDb();
// 		return db.collection('books')
// 			.find({ _id: new mongoDb.ObjectId(bookId) })
// 			.next()
// 			.then(rows => {
// 				return rows;
// 			})
// 			.catch(err => console.log(err));
// 	}
	
// 	static deleteById(bookId) {
// 		const db = getDb();
// 		return db.collection('books').deleteOne({ _id: new mongoDb.ObjectId(bookId) })
// 			.then()
// 			.catch(err => console.log(err));
// 	}
	
// }

// module.exports = Book;
