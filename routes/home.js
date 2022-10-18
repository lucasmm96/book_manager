const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home', route: '/' })
})

module.exports = router