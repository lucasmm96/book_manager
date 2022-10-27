const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');

const bookRoute = require('./routes/book');
const homeRoute = require('./routes/home');
const notFoundRoute = require('./routes/404');
const sequelize = require('./util/database')

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bookRoute);
app.use(homeRoute);
app.use(notFoundRoute);

sequelize.sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
