const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const path = require('path')

const bookRoute = require('./routes/book')
const homeRoute = require('./routes/home')
const notFoundRoute = require('./routes/404')

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(bookRoute)
app.use(homeRoute.router)
app.use(notFoundRoute)

app.listen(3000)