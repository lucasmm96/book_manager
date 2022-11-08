const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

const User = require('./models/user');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const homeRoute = require('./routes/home');
const notFoundRoute = require('./routes/error');

dotenv.config();
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findById('636a48f4645ec17fa5c13a10')
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use(adminRoute);
app.use(userRoute);
app.use(homeRoute);
app.use(notFoundRoute);

mongoose.connect(process.env.mongoURI)
	.then(() => {
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					username: 'default',
					email: 'default_user@br.ibm.com',
					books: []
				});
				user.save();
			}
		});
		console.log('App running on port 3000');
		app.listen(3000);
	})
	.catch(err => console.log(err));