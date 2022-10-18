const express = require('express')

const router = express.Router()

router.use('/book', (req, res) => {
  res.render('book', { pageTitle: 'Book' })
})

module.exports = router