const express = require('express')

const router = express.Router()

router.use((req, res, next) => {
  console.log('route /404')
  res.send('<h1>Page not found</h1>')  
})

module.exports = router