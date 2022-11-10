const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login', authController.getLogin);

router.post('/user-login', authController.postLogin)

router.post('/user-logout', authController.postLogout);

module.exports = router;