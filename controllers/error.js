exports.get404 = (req, res) => {
	res.render('error', { pageTitle: '404' });
};