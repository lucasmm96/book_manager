module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log('middleware/is-auth.js: You are not logged in.');
    return res.redirect('/login');
  }
  next();
}