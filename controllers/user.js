const Book = require('../models/book');

exports.getHome = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	res.render('user/home', { 
		pageTitle: 'User',
		pageInfo: 'User Menu',
		route: '/user',
		isAuthenticated: req.session.isLoggedIn
	});
};

exports.getUserBook = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	req.user
		.populate('books.id')
		.then((user) => { return user.books; })
		.then((userBooks) =>
			res.render('user/book-list', {
				pageTitle: 'Book List',
				pageInfo: 'My Books',
				route: '/user',
				bookList: userBooks,
				filter: 'user',
				isAuthenticated: req.session.isLoggedIn
			})
		)
		.catch((err) => console.log(err));
};

exports.getBookList = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
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
				filter: 'all',
				isAuthenticated: req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
};

exports.getAddBook = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then((book) => {
			res.render('user/book-management', {
				pageTitle: 'Book List',
				pageInfo: 'Add a Book',
				route: '/user',
				bookItem: book,
				isAuthenticated: req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
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
		.catch((err) => console.log(err));
};

exports.getUpdateBook = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	const bookId = req.params.bookId;
	req.user
		.populate('books.id')
		.then((user) => {
			return user.books.find(
				(foundItem) => bookId.toString() === foundItem.id._id.toString()
			);
		})
		.then((book) =>
			res.render('user/book-management', {
				pageTitle: 'Book Edit',
				pageInfo: 'Edit a Book',
				route: '/user',
				bookItem: book,
				editMode: 'true',
				isAuthenticated: req.session.isLoggedIn
			})
		)
		.catch((err) => console.log(err));
};

exports.postUpdateBook = (req, res) => {
	const bookId = req.body.id;
	const bookIndex = req.user.books.findIndex(
		(element) => element.id.toString() === bookId.toString()
	);
	const finishedAt = req.body.finishedAt;
	const score = req.body.score;
	const status = req.body.status;

	Book.findById(bookId)
		.then(() => {
			return req.user.updateBook(bookIndex, finishedAt, score, status);
		})
		.then(() => res.redirect('/user/book'))
		.catch((err) => console.log(err));
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
		.catch((err) => console.log(err));
};
