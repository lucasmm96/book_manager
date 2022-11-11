const User = require('../models/user');

exports.getLogin = (req, res) => {
	const isLoggedIn = req.session.isLoggedIn;
	const info = !isLoggedIn ? 'Login' : 'Logout';
	const username = !isLoggedIn ? '' : req.session.user.username;
	res.render('auth/login', {
		pageTitle: 'Login',
		pageInfo: info,
		route: '/login',
		isAuthenticated: isLoggedIn,
		username: username
	});
};

exports.postLogin = (req, res) => {
	User.findById('636a48f4645ec17fa5c13a10')
		.then(user => {
			req.session.user = user;
			req.session.isLoggedIn = true;
			req.session.save(err => {
				console.log(err);
				res.redirect('/');	
			});
		})
		.catch(err => console.log(err));
};

exports.postLogout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/login');
	})
};

exports.getRegister = (req, res) => {
	res.render('auth/register', {
		pageTitle: 'Register',
		pageInfo: 'Register',
		route: '/register',
		isAuthenticated: req.session.isLoggedIn
	});	
};

exports.postRegister = (req, res) => {
	
};