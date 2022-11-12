exports.getHome = (req, res) => {
	res.render('home', { pageTitle: 'Book Manager',
		route: '/',
		pageInfo: `Hi ${req.user.username}! Welcome to Book Manager.`,
		isAuthenticated: req.session.isLoggedIn});
};
