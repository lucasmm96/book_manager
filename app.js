const express = require('express')

const app = express()

const path = require('path')

app.use('/book', (req, res, next) => {
  console.log('route /book')
  res.send('<h1>Book</h1>')
})

app.get('/', (req, res, next) => {
  console.log('route /')
  res.send('<h1>Home</h1>')
})

app.use((req, res, next) => {
  console.log('route /404')
  res.send('<h1>Page not found</h1>')
})

app.listen(3000)