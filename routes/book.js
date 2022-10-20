const express = require('express')

const router = express.Router()

const home = require('./home')

router.use('/book', (req, res) => {
  res.render('book', { pageTitle: 'Book', route: '/book', bookList: home.books })
})

module.exports = router