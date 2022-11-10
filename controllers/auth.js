const User = require('../models/user');

exports.getLogin = (req, res) => {
	res.render('auth/login', {
		pageTitle: 'Login',
		route: '/login',
		isAuthenticated: req.session.isLoggedIn
	});
};

exports.postLogin = (req, res) => {
	User.findById('636a48f4645ec17fa5c13a10')
		.then(user => {
			req.session.user = user;
			req.session.isLoggedIn = true;
			res.redirect('/');
		})
		.catch(err => console.log(err));
};

exports.postLogout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/login');
	})
};