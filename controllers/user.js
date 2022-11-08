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
			res.render('user/book-list', { pageTitle: 'Book List', route: '/user', bookList: books, filter: 'all' });
		})
		.catch(err => console.log(err));
};

exports.getAddBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(books => {
			res.render('user/book-add', { pageTitle: 'Book List', route: '/user', book: books });
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
	.then(book => {
		console.log(book);
		console.log(req.user);
		return req.user.addBook(book, addedAt, finishedAt, score, status);
	})
	.then(() => {
		res.redirect('/user/book/add');
	})
	.catch(err => console.log(err));
};
