const User = require('../models/user');
const Book = require('../models/book');

exports.getHome = (req, res) => {
	res.render('user/home', { pageTitle: 'User', route: '/user' });
};

exports.getUserBook = (req, res) => {
	User.findById('6366bf3b6fa71465188963f1')
		.then(user => {
			const bookList = user.book.items;
			res.render('user/book-list', { pageTitle: 'Book List', route: '/user/book/list', bookList: bookList });
		})
		.catch(err => console.log(err));
};

exports.getBookList = (req, res) => {
	Book.find()
		.then(bookList => {
			res.render('user/book-list', { pageTitle: 'Book List', route: '/user/book/list', bookList: bookList });
		})
		.catch(err => console.log(err));
};

exports.getBookDetail = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(row => {
			console.log(row);
			res.render('user/book-detail', { pageTitle: 'Book Detail', route: '/user/book/detail', book: row });
		})
		.catch(err => console.log(err));
};
