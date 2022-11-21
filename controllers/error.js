exports.get404 = (req, res) => {
	res.render('error', { pageTitle: 'Error 404', pageInfo: 'Page not found', errorCode: 404 });
};

exports.get500 = (req, res, next) => {
	res.status(500).render('error', { pageTitle: 'Error 500', pageInfo: 'Some error ocurred', errorCode: 500 });
};