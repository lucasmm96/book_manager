const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
dotenv.config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');

const app = express();
const store = new MongoDBStore({
	uri: process.env.mongoURI,
	collection: 'sessions'
});

const User = require('./models/user');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const notFoundRoute = require('./routes/error');

app.use(favicon(__dirname + '/favicon.ico'));
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'my secret',
	resave: false,
	saveUninitialized: false,
	store: store
}));

app.use((req, res, next) => {
	if (!req.session.user) { return next(); }
	User.findById(req.session.user._id)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use(adminRoute);
app.use(userRoute);
app.use(homeRoute);
app.use(authRoute);
app.use(notFoundRoute);

mongoose.connect(process.env.mongoURI)
	.then(() => {
		app.listen(3000);
		console.log('App running on port 3000');
	})
	.catch(err => console.log(err));