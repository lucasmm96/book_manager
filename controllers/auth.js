const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const messages = require('../public/data/messages.json')[0]

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getProfile = (req, res) => {
	const isLoggedIn = req.session.isLoggedIn;
	const username = isLoggedIn ? req.session.user.username : null;
	const flashMessage = req.flash('errorMessage');
	const userFeedback = flashMessage.length > 0 ? flashMessage[0].errorMessage : null;
	res.render('auth/profile', {
		pageTitle: 'Profile',
		pageInfo: 'Profile',
		route: '/profile',
		username: username,
		userFeedback: userFeedback
	});
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
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('auth/register', {
			pageTitle: 'Register',
			pageInfo: 'Register',
			route: '/register',
			userFeedback: errors.array()[0].msg
		});
	}
	bcrypt
		.hash(password, 12)
		.then(hashedPassword => {
			return new User({
				username: username,
				email: email,
				password: hashedPassword,
				books: []
			});
		})
		.then(newUser => {
			return newUser.save();
		})
		.then(() => {
			return res.redirect('/login');
		})
		.then(() => {
			sgMail
				.send({
					to: email,
					from: 'lucasma@br.ibm.com',
					subject: 'Register succeeded',
					html: '<h1>You have been successfully registered.</h1>'
				});
		})
		.catch(err => console.log(err));
};

exports.getReset = (req, res) => {
	const flashMessage = req.flash('errorMessage');
	const userFeedback = flashMessage.length > 0 ? flashMessage[0].errorMessage : null;
	res.render('auth/reset', {
		pageTitle: 'Reset',
		pageInfo: 'Password Reset: Open request',
		route: '/profile',
		userFeedback: userFeedback,
		action: 'open_request'
	});
};

exports.postReset = (req, res) => {
	User.findOne({ email: req.body.email })	
		.then(user => {
			if (!user) {
				req.flash('errorMessage', { errorMessage: 'User not found' });
				return res.redirect('/reset');
			}
			user.resetToken = crypto.randomBytes(32).toString('hex');
			user.resetTokenExpiration = Date.now() + 3600000;
			user.save();
			res.redirect('/profile');
			sgMail
				.send({ 
					to: req.body.email, 
					from: messages.email_to_user.from, 
					subject: messages.email_to_user.subjects.password_reset,
					html: `<h2>Password Reset</h2>
						<p>You requested a password reset.</p>
						<p>Click on the <a href=\"http://localhost:3000/reset/${ user.resetToken }\">LINK</a> to set a new password.</p>`
				});
		})
		.catch(err => console.log(err));
};

exports.getNewPassword = (req, res) => {
	const token = req.params.token;
	User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
		.then(user => {
			const flashMessage = req.flash('errorMessage');
			const userFeedback = flashMessage.length > 0 ? flashMessage[0].errorMessage : null;
			res.render('auth/reset', {
				pageTitle: 'Reset',
				pageInfo: 'Password Reset',
				route: '/profile',
				userFeedback: userFeedback,
				action: 'save_request',
				userId: user._id,
				userEmail: user.email,
				userToken: token
			});
		})
		.catch(err => console.log(err));
};

exports.postNewPassword = (req, res) => {
	const userId = req.body.id;
	const token = req.body.token;
	const newPassword = req.body.password;
	const checkPassword = req.body.checkPassword;
	let resetUser;
	if (newPassword !== checkPassword) {
		req.flash('errorMessage', { errorMessage: 'Passwords are not matching.' });
		return res.redirect(`/reset/${ token }`);
	}
	User.findOne({ _id: userId, resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
		.then(user => {
			resetUser = user;
			return bcrypt.hash(newPassword, 12)
		})
		.then(hashedPassword => {
			resetUser.password = hashedPassword;
			resetUser.resetToken = undefined;
			resetUser.resetTokenExpiration = undefined;
			return resetUser.save();
		})
		.then(() => {
			res.redirect('login')
		})
		.catch(err => console.log(err));
};

exports.getLogin = (req, res) => {
	const flashMessage = req.flash('errorMessage');
	const userFeedback = flashMessage.length > 0 ? flashMessage[0].errorMessage : null;
	res.render('auth/login', {
		pageTitle: 'Login',
		pageInfo: 'Login',
		route: '/profile',
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
		res.redirect('/profile');
	})
};
