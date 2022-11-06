const Book = require('../models/book');
const User = require('../models/user');

exports.getHome = (req, res) => {
	res.render('admin/home', { pageTitle: 'Admin', route: '/admin' });
};

exports.getBookList = (req, res) => {
	Book.find()
		.then(rows => {
			res.render('admin/book-list', { pageTitle: 'Book List', route: '/admin', bookList: rows });
		})
		.catch(err => console.log(err));
};

exports.getAddBook = (req, res) => {
	res.render('admin/book-add', {
		pageTitle: 'Add Book',
		route: '/admin',
		editMode: 'false',
	});
};

exports.postAddBook = (req, res) => {
	const newTitle = req.body.title;
	const newAuthor = req.body.author;
	// const newAddedAt = req.body.addedAt;
	// const newFinishedAt = req.body.finishedAt;
	// const newScore = req.body.score;
	// const newStatus = req.body.status;

	const newBook = new Book({
		title: newTitle,
		author: newAuthor,
		// addedAt: newAddedAt,
		// finishedAt: newFinishedAt,
		// score: newScore,
		// status: newStatus
	})
	newBook.save()
		.then(() => {
			res.redirect('/admin/manage-book');
		})
		.catch(err => console.log(err));
};

exports.getEditBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(row => {
			res.render('admin/book-add', { pageTitle: 'Edit Book', route: '/admin', book: row, editMode: 'true' });
		})
		.catch(err => console.log(err));
};

exports.postEditBook = (req, res) => {
	const bookId = req.body.id;
	const updatedTitle = req.body.title;
	const updatedAuthor = req.body.author;
	// const updatedAddedAt = req.body.addedAt;
	// const updatedFinishedAt = req.body.finishedAt;
	// const updatedScore = req.body.score;
	// const updatedStatus = req.body.status;

	Book.findById(bookId).then(book => {
		book.title = updatedTitle;
		book.author = updatedAuthor;
		// book.addedAt = updatedAddedAt;
		// book.finishedAt = updatedFinishedAt;
		// book.score = updatedScore;
		// book.status = updatedStatus;
		return book.save();
	})
	.then(() => {
		res.redirect('/admin/manage-book');
	})
	.catch(err => console.log(err));
};

exports.getDeleteBook = (req, res) => {
	const bookId = req.params.bookId;

	Book.findByIdAndRemove(bookId).then(() => {
		res.redirect('/admin/manage-book');
	}).catch(err => console.log(err));
};

exports.getUserist = (req, res) => {
	User.find()
		.then(userList => {
			res.render('admin/user-list', { pageTitle: 'User List', route: '/admin', userList: userList });
		})
		.catch(err => console.log(err));
};