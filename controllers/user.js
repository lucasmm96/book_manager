const User = require('../models/user');
const Book = require('../models/book');

exports.getHome = (req, res) => {
	res.render('user/home', { pageTitle: 'User', route: '/user' });
};

exports.getUserBook = (req, res) => {
	User.findById('6367e5905de87f7310c03a69')
		.then(user => {
			const bookList = user.book.items;
			res.render('user/book-list', { pageTitle: 'Book List', route: '/user', bookList: bookList });
		})
		.catch(err => console.log(err));
};

exports.getBookList = (req, res) => {
	Book.find()
		.then(bookList => {
			res.render('user/book-list', { pageTitle: 'Book List', route: '/user', bookList: bookList });
		})
		.catch(err => console.log(err));
};

exports.getAddBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(book => {
			res.render('user/book-add', { pageTitle: 'Book List', route: '/user', book: book });
		})
		.catch(err => console.log(err));
};

exports.postAddBook = (req, res) => {
	const bookId = req.body.id;
	const AddedAt = new Date().toISOString().slice(0, 10);
	const FinishedAt = req.body.finishedAt;
	const Score = req.body.score;
	const Status = req.body.status;
	
	User.findById('6367e5905de87f7310c03a69')
		.then(user => {
			const book = {
				_id: bookId,
				addedAt: AddedAt,
				finishedAt: FinishedAt,
				score: Score,
				status: Status
			}
			user.book.items.push(book);
			return user.save();
		})
		.then(() => {
			res.redirect('/user/book/add');
		})
		.catch(err => console.log(err));	
};

exports.getBookDetail = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(row => {
			console.log(row);
			res.render('user/book-detail', { pageTitle: 'Book Detail', route: '/user', book: row });
		})
		.catch(err => console.log(err));
};
