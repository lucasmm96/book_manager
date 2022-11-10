exports.getLogin = (req, res) => {
	res.render('auth/login', { pageTitle: 'Login', route: '/login', isAuthenticated: req.isLogged });
};
