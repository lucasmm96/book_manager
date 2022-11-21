const Book = require('../models/book');
const { validationResult } = require('express-validator');
const messages = require('../public/data/messages.json')[0]

exports.getHome = (req, res) => {
	res.render('user/home', {
		pageTitle: 'User',
		pageInfo: 'User Menu',
		route: '/user'
	});
};

exports.getUserBook = (req, res) => {
	req.user
		.populate('books.id')
		.then((user) => { return user.books; })
		.then((userBooks) =>
			res.render('user/book-list', {
				pageTitle: 'Book List',
				pageInfo: 'My Books',
				route: '/user',
				bookList: userBooks,
				filter: 'user'
			})
		)
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.getBookList = (req, res) => {
	Book.find()
		.then((bookList) => {
			const filteredBooks = bookList.map((mappedItem) => {
				const exists = req.user.books.find(
					(foundItem) => foundItem.id.toString() === mappedItem.id.toString()
				);
				return exists ? { ...mappedItem._doc, isAdded: 'true' } : mappedItem;
			});
			res.render('user/book-list', {
				pageTitle: 'Book List',
				pageInfo: 'Add a Book',
				route: '/user',
				bookList: filteredBooks,
				filter: 'all'
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.getAddBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(book => {
			res.render('user/book-management', {
				pageTitle: 'Book List',
				pageInfo: 'Add a Book',
				route: '/user',
				bookItem:
					{ id: book._id,
						title: book.title,
						author: book.author,
						addedAt: new Date().toISOString().slice(0, 10),
						finishedAt: '',
						score: '',
						status: ''
					}
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.postAddBook = (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('user/book-management', {
			pageTitle: 'Book List',
			pageInfo: 'Add a Book',
			route: '/user',
			userFeedback: errors.array()[0].msg,
			bookItem:
				{ id: req.body._id,
					title: req.body._title,
					author: req.body._author,
					addedAt: req.body._addedAt ? new Date(req.body._addedAt).toISOString().slice(0, 10) : '',
					finishedAt: req.body.finishedAt ? new Date(req.body.finishedAt).toISOString().slice(0, 10) : '',
					score:req.body.score ? req.body.score : '',
					status: req.body.status ? req.body.status : ''
				}
		});
	}
	const bookId = req.body._id;
	const addedAt = req.body._addedAt
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
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.getUpdateBook = (req, res) => {
	const bookId = req.params.bookId;
	req.user
		.populate('books.id')
		.then(user => {
			return user.books.find(foundItem => bookId.toString() === foundItem.id._id.toString());
		})
		.then(book => {
			res.render('user/book-management', {
				pageTitle: 'Book Edit',
				pageInfo: 'Edit a Book',
				route: '/user',
				bookItem:
					{ id: book.id._id,
						title: book.id.title,
						author: book.id.author,
						addedAt: new Date(book.addedAt).toISOString().slice(0, 10),
						finishedAt: book.finishedAt ? new Date(book.finishedAt).toISOString().slice(0, 10) : '',
						score: book.score ? book.score : '',
						status: book.status ? book.status : ''
					},
				editMode: 'true'
			})
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.postUpdateBook = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.render('user/book-management', {
			pageTitle: 'Book Edit',
			pageInfo: 'Edit a Book',
			route: '/user',
			userFeedback: errors.array()[0].msg,
			bookItem:
				{ id: req.body._id,
					title: req.body._title,
					author: req.body._author,
					addedAt: new Date(req.body._addedAt).toISOString().slice(0, 10),
					finishedAt: req.body.finishedAt ? new Date(req.body.finishedAt).toISOString().slice(0, 10) : '',
					score: req.body.score ? req.body.score : '',
					status: req.body.status ? req.body.status : ''
				},
			editMode: 'true'
		})
	}
	const bookId = req.body._id;
	const bookIndex = req.user.books.findIndex(element => { return element.id.toString() === bookId.toString() });
	const finishedAt = req.body.finishedAt;
	const score = req.body.score;
	const status = req.body.status;
	Book.findById(bookId)
		.then(() => {
			return req.user.updateBook(bookIndex, finishedAt, score, status);
		})
		.then(() => res.redirect('/user/book'))
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};

exports.getRemoveBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(() => {
			return req.user.removeBook(bookId);
		})
		.then(() => {
			res.redirect('/user/book');
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
};
