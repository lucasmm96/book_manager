const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login', authController.getLogin);

router.post('/user-login', (req, res) => {
  res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly')
  res.redirect('/');
});

module.exports = router;