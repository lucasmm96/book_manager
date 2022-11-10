const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login', authController.getLogin);

router.post('/user-login', (req, res) => {
  req.isLogged = true;
  res.redirect('/');
});

module.exports = router;