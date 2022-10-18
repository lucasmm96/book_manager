const express = require('express')

const router = express.Router()

const bookAttributes = require ('../public/json/book-attributes.json')

router.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home', route: '/', bookAttributes: bookAttributes })
})

module.exports = router