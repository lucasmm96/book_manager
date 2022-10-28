const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');

const bookRoute = require('./routes/book');
const homeRoute = require('./routes/home');
const notFoundRoute = require('./routes/404');
const sequelize = require('./util/database');
const Book = require('./models/book');
const User = require('./models/user');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((res, res, next) => {
	User.findByPk(1)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use(bookRoute);
app.use(homeRoute);
app.use(notFoundRoute);

Book.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Book);

sequelize
	.sync()
	.then(() => {
		return User.findByPk(1);
	})
	.then(user => {
		if (!user) {
			return User.create({ name: 'Lucas', email: 'lucasma@br.ibm.com' });
		}
		return user;
	})
	.then(() => {
		app.listen(3000);
	})
	.catch(err => console.log(err));
