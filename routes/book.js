const express = require('express')

const router = express.Router()

const path = require('path')

router.use('/book', (req, res, next) => {
  console.log('route /book')
  res.sendFile(path.join(__dirname, '..', 'views', 'book.html'))
})

module.exports = router