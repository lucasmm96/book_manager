const express = require('express')

const router = express.Router()

router.use('/book', (req, res) => {
  res.render('book')
})

module.exports = router