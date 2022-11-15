const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const checkCSRF = require('../middleware/check-csrf');

router.get('/profile', authController.getProfile);

router.get('/register', authController.getRegister);

router.post('/user-register', checkCSRF, authController.postRegister);

router.get('/reset', authController.getReset);

router.post('/user-reset', checkCSRF, authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', checkCSRF, authController.postNewPassword);

router.get('/login', authController.getLogin);

router.post('/user-login', checkCSRF, authController.postLogin);

router.post('/user-logout', checkCSRF, authController.postLogout);

module.exports = router;