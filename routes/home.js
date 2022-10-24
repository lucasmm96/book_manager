const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/', booksController.getHome);

module.exports = router;
