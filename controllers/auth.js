exports.getLogin = (req, res) => {
	const isLogged = req.get('Cookie').trim().split('=')[1] === 'true';
	res.render('auth/login', {
		pageTitle: 'Login',
		route: '/login',
		isAuthenticated: isLogged
	});
};
