exports.get404 = (req, res) => {
	res.render('404', {
		pageTitle: '404',
		isAuthenticated: req.session.isLoggedIn
	});
};
