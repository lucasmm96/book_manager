const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('route /')
  res.send('<h1>Home</h1>')
})

module.exports = router