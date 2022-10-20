const express = require('express')
const router = express.Router()
const booksController = require('../controllers/books')

router.get('/', booksController.getAddBooks)

router.post('/add-book', booksController.postAddBooks)

module.exports = router
