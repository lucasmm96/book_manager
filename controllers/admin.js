const Book = require('../models/book');
const User = require('../models/user');

exports.getHome = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	res.render('admin/home', {
		pageTitle: 'Admin',
		pageInfo: 'Administrator Menu',
		route: '/admin',
		isAuthenticated: req.session.isLoggedIn
	});
};

exports.getBookList = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	Book.find()
		.then((rows) => {
			res.render('admin/book-list', {
				pageTitle: 'Book List',
				pageInfo: 'Book List',
				route: '/admin',
				bookList: rows,
				isAuthenticated: req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
};

exports.getAddBook = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	res.render('admin/book-management', {
		pageTitle: 'Add Book',
		pageInfo: 'Add a Book',
		route: '/admin',
		editMode: 'false',
		isAuthenticated: req.session.isLoggedIn
	});
};

exports.postAddBook = (req, res) => {
	const newTitle = req.body.title;
	const newAuthor = req.body.author;
	const newBook = new Book({
		title: newTitle,
		author: newAuthor,
	});
	newBook
		.save()
		.then(() => {
			res.redirect('/admin/manage-book');
		})
		.catch((err) => console.log(err));
};

exports.getEditBook = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then((row) => {
			res.render('admin/book-management', {
				pageTitle: 'Edit Book',
				pageInfo: 'Edit a Book',
				route: '/admin',
				book: row,
				editMode: 'true',
				isAuthenticated: req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditBook = (req, res) => {
	const bookId = req.body.id;
	const updatedTitle = req.body.title;
	const updatedAuthor = req.body.author;

	Book.findById(bookId)
		.then((book) => {
			book.title = updatedTitle;
			book.author = updatedAuthor;
			return book.save();
		})
		.then(() => {
			res.redirect('/admin/manage-book');
		})
		.catch((err) => console.log(err));
};

exports.getDeleteBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findByIdAndRemove(bookId)
		.then(() => {
			res.redirect('/admin/manage-book');
		})
		.catch((err) => console.log(err));
};

exports.getUserist = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	User.find()
		.populate('books.id')
		.then((userList) => {
			res.render('admin/user-list', {
				pageTitle: 'User List',
				pageInfo: 'User List',
				route: '/admin',
				userList: userList,
				isAuthenticated: req.session.isLoggedIn
			});
		})
		.catch((err) => console.log(err));
};
