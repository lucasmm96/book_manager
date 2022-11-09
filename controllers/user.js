const User = require('../models/user');
const Book = require('../models/book');

exports.getHome = (req, res) => {
	res.render('user/home', { pageTitle: 'User', route: '/user' });
};

exports.getUserBook = (req, res) => {
	req.user
	.populate('books._id')
	.then(user => {
		const books = user.books;
		res.render('user/book-list', { pageTitle: 'Book List', route: '/user', bookList: books, filter: 'user' });
	})
	.catch(err => console.log(err));
};

exports.getBookList = (req, res) => {
	Book.find()
		.then(books => {
			const filteredBooks = books.map(book => {
				const exists = req.user.books.find(value => value._id.toString() === book._id.toString());
				return exists ? {...book._doc, isAdded: 'true'} : book;
			});
			res.render('user/book-list', { pageTitle: 'Book List', route: '/user', bookList: filteredBooks, filter: 'all' });
		})
		.catch(err => console.log(err));
};

exports.getAddBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(books => {
			res.render('user/book-management', { pageTitle: 'Book List', route: '/user', book: books });
		})
		.catch(err => console.log(err));
};

exports.postAddBook = (req, res) => {
	const bookId = req.body.id;
	const addedAt = new Date();
	const finishedAt = req.body.finishedAt;
	const score = req.body.score;
	const status = req.body.status;

	Book.findById(bookId)
	.then(() => {
		return req.user.addBook(bookId, addedAt, finishedAt, score, status);
	})
	.then(() => {
		res.redirect('/user/book/add');
	})
	.catch(err => console.log(err));
};

exports.getUpdateBook = (req, res) => {
	const bookId = req.params.bookId;
	req.user
	.populate('books._id')
	.then(user => {
		const selectedBook = user.books.find(book => bookId.toString() === book._id._id.toString());
		const structuredBook = {
			_id: selectedBook._id._id,
			title: selectedBook._id.title,
			author: selectedBook._id.author,
			addedAt: selectedBook.addedAt,
			finishedAt: selectedBook.finishedAt,
			score: selectedBook.score,
			status: selectedBook.status
		}
		res.render('user/book-management', { pageTitle: 'Book Edit', route: '/user', editMode: 'true', book: structuredBook });
	})
	.catch(err => console.log(err));
};

exports.postUpdateBook = (req, res) => {
	const bookId = req.body.id;
	const finishedAt = req.body.finishedAt;
	const score = req.body.score;
	const status = req.body.status;
	const bookIndex = req.user.books.findIndex(element => element._id.toString() === bookId.toString())	
	Book.findById(bookId)
	.then(() => {
		return req.user.updateBook(bookIndex, bookId, finishedAt, score, status)
	})
	.then (() => res.redirect('/user/book'))
	.catch(err => console.log(err));
};

exports.getRemoveBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId).then(() => {
		return req.user.removeBook(bookId);
	})
	.then(() => {
		res.redirect('/user/book');
	})
	.catch(err => console.log(err));
};