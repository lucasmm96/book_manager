const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/book/list', booksController.getBookList);

// router.get('/book/detail/:bookId', booksController.getBookDetail);

router.get('/book/add', booksController.getAddBook);

router.post('/add-book', booksController.postAddBook);

// router.get('/book/edit/:bookId', booksController.getEditBook);

// router.post('/edit-book', booksController.postEditBook);

// router.get('/book/remove/:bookId', booksController.getRemoveBook);

module.exports = router;