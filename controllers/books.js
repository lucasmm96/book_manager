const bookAttr = require ('../public/json/book-attributes.json');
const books = [];

exports.getAddBooks = (req, res) => {
  res.render('home', { pageTitle: 'Home', route: '/', bookAttributes: bookAttr });
}

exports.postAddBooks = (req, res) => {
  books.push(JSON.parse(JSON.stringify(req.body)));
  res.redirect('/book');
}

exports.getBooks = (req, res) => {
  res.render('book', { pageTitle: 'Book', route: '/book', bookList: books })
}