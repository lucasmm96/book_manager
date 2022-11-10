const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const User = require('../models/user');

router.get('/login', authController.getLogin);

router.post('/user-login', (req, res) => {
  User.findById('636a48f4645ec17fa5c13a10')
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

module.exports = router;