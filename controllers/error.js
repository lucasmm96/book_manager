exports.get404 = (req, res) => {
	res.render('404', {
		pageTitle: '404',
		pageInfo: 'Error',
		isAuthenticated: req.session.isLoggedIn
	});
};
