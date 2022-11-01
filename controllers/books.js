const Book = require('../models/book');

exports.getHome = (req, res) => {
	res.render('home', { pageTitle: 'Home', route: '/' });
};

exports.getBookList = (req, res) => {
	Book.find()
		.then(rows => {
			res.render('books/book-list', { pageTitle: 'Book List', route: '/book', bookList: rows });
		})
		.catch(err => console.log(err));
};

exports.getBookDetail = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(row => {
			console.log(row);
			res.render('books/book-detail', { pageTitle: 'Book Detail', route: '/book', book: row });
		})
		.catch(err => console.log(err));
};

exports.getAddBook = (req, res) => {
	res.render('books/book-add', {
		pageTitle: 'Add Book',
		route: '/book',
		editMode: 'false',
	});
};

exports.postAddBook = (req, res) => {
	const newTitle = req.body.title;
	const newAuthor = req.body.author;
	const newAddedAt = req.body.addedAt;
	const newFinishedAt = req.body.finishedAt;
	const newScore = req.body.score;
	const newStatus = req.body.status;

	const newBook = new Book({
		title: newTitle,
		author: newAuthor,
		addedAt: newAddedAt,
		finishedAt: newFinishedAt,
		score: newScore,
		status: newStatus
	})
	newBook.save()
		.then(() => {
			console.log('Book successfully created');
			res.redirect('/')
		})
		.catch(err => console.log(err));
};

exports.getEditBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then(row => {
			res.render('books/book-add', { pageTitle: 'Edit Book', route: '/book', book: row, editMode: 'true' });
		})
		.catch(err => console.log(err));
};

exports.postEditBook = (req, res) => {
	const bookId = req.body.id;
	const updatedTitle = req.body.title;
	const updatedAuthor = req.body.author;
	const updatedAddedAt = req.body.addedAt;
	const updatedFinishedAt = req.body.finishedAt;
	const updatedScore = req.body.score;
	const updatedStatus = req.body.status;

	Book.findById(bookId).then(book => {
		book.title = updatedTitle;
		book.author = updatedAuthor;
		book.addedAt = updatedAddedAt;
		book.finishedAt = updatedFinishedAt;
		book.score = updatedScore;
		book.status = updatedStatus;
		return book.save();
	})
	.then(() => {
		console.log('Book successfully updated');
		res.redirect('/')
	})
	.catch(err => console.log(err));
};

exports.getDeleteBook = (req, res) => {
	const bookId = req.params.bookId;

	Book.deleteById(bookId)
		.then(() => {
			console.log('Book successfully deleted');
			res.redirect('/')
		})
		.catch(err => console.log(err));
};
