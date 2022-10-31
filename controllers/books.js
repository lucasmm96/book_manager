const Book = require('../models/book');

exports.getHome = (req, res) => {
	res.render('home', { pageTitle: 'Home', route: '/' });
};

exports.getBookList = (req, res) => {
	Book.fetchAll()
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
	const newAddedAt = req.body.added_at;
	const newFinishedAt = req.body.finished_at;
	const newScore = req.body.score;
	const newStatus = req.body.status;

	const newBook = new Book (newTitle,newAuthor, newAddedAt, newFinishedAt, newScore, newStatus);
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
	const updatedAuthor = req.body.author;
	const updatedAddedAt = req.body.addedAt;
	const updatedFinishedAt = req.body.finishedAt;
	const updatedTitle = req.body.title;
	const updatedScore = req.body.score;
	const updatedStatus = req.body.status;

	const updatedBook = new Book (updatedTitle, updatedAuthor, updatedAddedAt, updatedFinishedAt, updatedScore, updatedStatus, bookId);
	updatedBook.save()
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
