module.exports = (req, res, next) => {
  if (!req.body.csrf) {
    console.log('middleware/check-csrf.js: Token is not defined.');
    return res.redirect('/login');
  }
  if (req.body.csrf !== req.session.csrf) {
    console.log('middleware/check-csrf.js: Token does not match.');
    return res.redirect('/login');
  }
  next();
}