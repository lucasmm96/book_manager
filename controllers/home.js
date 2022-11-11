const messages = require('../public/data/messages.json')[0];

exports.getHome = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', route: '/login', message: messages.notLogged }) }
	res.render('home', { pageTitle: 'Home', route: '/', isAuthenticated: req.session.isLoggedIn});
};
