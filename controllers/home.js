exports.getHome = (req, res) => {
	res.render('home', { pageTitle: 'Home', route: '/' });
};
