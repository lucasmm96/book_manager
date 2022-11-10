const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login', authController.getLogin);

router.post('/user-login', (req, res) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
});

module.exports = router;