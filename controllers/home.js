exports.getHome = (req, res) => {
	if (!req.session.isLoggedIn) { return res.render('auth/login', { pageTitle: 'Login', pageInfo: 'Login', route: '/login' }) }
	res.render('home', { pageTitle: 'Book Manager',
		route: '/',
		pageInfo: `Hi ${req.user.username}! Welcome to Book Manager.`,
		isAuthenticated: req.session.isLoggedIn});
};
