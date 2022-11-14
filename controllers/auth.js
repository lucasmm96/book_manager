const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res) => {
	const isLoggedIn = req.session.isLoggedIn;
	const info = !isLoggedIn ? 'Login' : 'Logout';
	const username = !isLoggedIn ? '' : req.session.user.username;
	const flashMessage = req.flash('errorMessage');
	const userFeedback = flashMessage.length > 0 ? flashMessage[0].errorMessage : null;
	res.render('auth/login', {
		pageTitle: 'Login',
		pageInfo: info,
		route: '/login',
		username: username,
		userFeedback: userFeedback
	});
};

exports.postLogin = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then(result => {
			if (!result) {
				req.flash('errorMessage', { errorMessage: 'Invalid email or password.' });
				return res.redirect('/login')
			}
			bcrypt.compare(password, result.password)
				.then(matchResult => {
					if (matchResult) {
						req.session.user = result;
						req.session.isLoggedIn = true;
						return req.session.save(err => {
							err ? console.log(err) : '';
							res.redirect('/');
						})
					}
					req.session.isLoggedIn = false;
					req.flash('errorMessage', { errorMessage: 'Invalid email or password.' });
					res.redirect('/login');
				})
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
};

exports.postLogout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/login');
	})
};

exports.getRegister = (req, res) => {
	const flashMessage = req.flash('errorMessage');
	const userFeedback = flashMessage.length > 0 ? flashMessage[0].errorMessage : null;
	res.render('auth/register', {
		pageTitle: 'Register',
		pageInfo: 'Register',
		route: '/register',
		userFeedback: userFeedback
	});	
};

exports.postRegister = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const checkPassword = req.body.checkPassword;
	if (password !== checkPassword) {
		req.flash('errorMessage', { errorMessage: 'Passwords are not matching.' });
		return res.redirect('/register');
	}
	User.findOne({ email: email })	
		.then(result => {
			if (result) {
				req.flash('errorMessage', { errorMessage: 'The email is arealdy registered.' });
				return res.redirect('/register');
			}
			return bcrypt.hash(password, 12)
				.then(hashedPassword => {
					const newUser = new User({
						username: username,
						email: email,
						password: hashedPassword,
						books: []
					})
					.catch(err => console.log(err));
					return newUser.save();
			});
		})
		.then(() => {
			res.redirect('/login')
		})
		.catch(err => {
			console.log(err);
		});
};