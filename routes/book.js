const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/book/add', booksController.getAddBooks);

router.post('/add-book', booksController.postAddBooks);

router.get('/book/list', booksController.getBookList);

router.get('/book/detail/:bookId', booksController.getBookDetail);

module.exports = router;