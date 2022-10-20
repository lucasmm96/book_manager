const bookAttr = require ('../public/json/book-attributes.json');
const Book = require('../models/book')
const books = [];

exports.getAddBooks = (req, res) => {
  res.render('home', { pageTitle: 'Home', route: '/', bookAttributes: bookAttr });
}

exports.postAddBooks = (req, res) => {
  const book = new Book(req.body.title, req.body.author, req.body.added_at, req.body.finished_at, req.body.score, req.body.status);
  book.save();
  res.redirect('/book');
}

exports.getBooks = (req, res) => {
  const books = Book.fetchAll();
  res.render('book', { pageTitle: 'Book', route: '/book', bookList: books });
}
