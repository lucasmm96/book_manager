const express = require('express')
const app = express()

const path = require('path')

const bookRoute = require('./routes/book')
const homeRoute = require('./routes/home')
const notFoundRoute = require('./routes/404')

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bookRoute)
app.use(homeRoute)
app.use(notFoundRoute)

app.listen(3000)