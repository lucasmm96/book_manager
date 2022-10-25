const bookAttr = require ('../public/data/book-attributes.json');
const Book = require('../models/book');

exports.getHome = (req, res) => {
  res.render('home', { pageTitle: 'Home', route: '/' });
};

exports.getBookList = (req, res) => {
  Book.fetchAll(books => {
    res.render('books/book-list', { pageTitle: 'Book List', route: '/book', bookList: books });
  });
};

exports.getBookDetail = (req, res) => {
  const bookId = req.params.bookId;
  Book.findById(bookId, book => {
    res.render('books/book-detail', { pageTitle: 'Book Detail', route: '/book', book: book });
  });
};

exports.getAddBook = (req, res) => {
  res.render('books/book-add', { pageTitle: 'Add Book', route: '/book', bookAttributes: bookAttr });
};

exports.postAddBook = (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const added_at = req.body.added_at;
  const finished_at = req.body.finished_at;
  const score = req.body.score;
  const status = req.body.status;
  const book = new Book(title, author, added_at, finished_at, score, status);
  book.save();
  res.redirect('/');
};

exports.postRemoveBook = (req, res) => {
  const bookId = req.body.bookId;
  Book.remove(bookId);
  // res.redirect('/book/list');
  res.redirect('/');
};
