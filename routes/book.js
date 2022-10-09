const express = require('express')

const router = express.Router()

router.use('/book', (req, res, next) => {
  console.log('route /book')
  res.send('<h1>Book</h1>')  
})

module.exports = router