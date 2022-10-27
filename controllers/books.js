const Book = require('../models/book');

exports.getHome = (req, res) => {
	res.render('home', { pageTitle: 'Home', route: '/' });
};

exports.getBookList = (req, res) => {
	Book.findAll()
		.then(rows => {
			res.render('books/book-list', {
				pageTitle: 'Book List',
				route: '/book',
				bookList: rows,
			});
		})
		.catch((err) => console.log(err));
};

exports.getBookDetail = (req, res) => {
	const bookId = req.params.bookId;
	Book.findByPk(bookId)
		.then(rows => {
			res.render('books/book-detail', {
				pageTitle: 'Book Detail',
				route: '/book',
				book: rows,
			});
		})
		.catch((err) => console.log(err));
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

	Book.create({
		title: newTitle,
		author: newAuthor,
		added_at: newAddedAt,
		finished_at: newFinishedAt,
		score: newScore,
		status: newStatus,
	})
		.then(() => {
			res.redirect('/');
		})
		.catch((err) => console.log(err));
};

exports.getEditBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.findByPk(bookId)
		.then(rows => {
			res.render('books/book-add', {
				pageTitle: 'Edit Book',
				route: '/book',
				book: rows,
				editMode: 'true',
			});
		})
		.catch((err) => console.log(err));
};

exports.postEditBook = (req, res) => {
	const boodId = req.body.id;
	const updatedAuthor = req.body.author;
	const updatedAdded_at = req.body.added_at;
	const updatedFinished_at = req.body.finished_at;
	const updatedTitle = req.body.title;
	const updatedScore = req.body.score;
	const updatedStatus = req.body.status;

	Book.update(
		{
			title: updatedTitle,
			author: updatedAuthor,
			added_at: updatedAdded_at,
			finished_at: updatedFinished_at,
			score: updatedScore,
			status: updatedStatus,
		},
		{
			where: { id: boodId },
		}
	)
		.then(() => {
			res.redirect('/');
		})
		.catch((err) => console.log(err));
};

exports.getRemoveBook = (req, res) => {
	const bookId = req.params.bookId;
	Book.destroy({
		where: { id: bookId },
	})
		.then(() => {
			res.redirect('/');
		})
		.catch((err) => console.log(err));
};
