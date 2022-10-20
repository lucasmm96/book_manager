const express = require('express')

const router = express.Router()

const bookAttributes = require ('../public/json/book-attributes.json')

const books = []

router.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home', route: '/', bookAttributes: bookAttributes })
})

router.post('/add-book', (req, res) => {
  books.push(JSON.parse(JSON.stringify(req.body)));
  res.redirect('/book')
})

exports.router = router
exports.books = books
