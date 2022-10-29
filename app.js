const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const path = require('path');

const bookRoute = require('./routes/book');
const homeRoute = require('./routes/home');
const notFoundRoute = require('./routes/404');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
	// User.findByPk(1)
	// 	.then(user => {
	// 		req.user = user;
	// 		next();
	// 	})
	// 	.catch(err => console.log(err));
// });

app.use(bookRoute);
app.use(homeRoute);
app.use(notFoundRoute);

mongoConnect(() => {
	app.listen(3000);	
});
