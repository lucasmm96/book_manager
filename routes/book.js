const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/book', booksController.getBooks);

router.get('/book/:bookId', booksController.getBookDetails);

module.exports = router;