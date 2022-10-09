const express = require('express')

const app = express()

const bookRoute = require('./routes/book')
const homeRoute = require('./routes/home')
const notFoundRoute = require('./routes/404')

app.use(bookRoute)
app.use(homeRoute)
app.use(notFoundRoute)

app.listen(3000)