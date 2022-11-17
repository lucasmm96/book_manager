const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const checkCSRF = require('../middleware/check-csrf');
const { check } = require('express-validator');
const messages = require('../public/data/messages.json')[0].validation_messages
const User = require('../models/user');

router.get('/profile', authController.getProfile);

router.get('/register', authController.getRegister);

router.post('/user-register',
  checkCSRF, 
  check('email')
    .isEmail()
    .withMessage( messages.email_invalid)
    .custom((value, { req }) => {
      return User.findOne({ email: value })	
      .then(user => {
        if (user) {
          return Promise.reject(messages.email_duplicated)
        }
      });
    }),
  check('password', messages.password)
    .isLength({ min: 5 })
    .isAlphanumeric(),
  check('checkPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(messages.password_check) ;
    }
    return true;
  }),
  authController.postRegister
);

router.get('/reset', authController.getReset);

router.post('/user-reset', checkCSRF, authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', checkCSRF, authController.postNewPassword);

router.get('/login', authController.getLogin);

router.post('/user-login', 
  checkCSRF,
  check('email')
    .custom((value, { req }) => {
      return User.findOne({ email: value })	
      .then(user => {
        if (!user) {
          return Promise.reject(messages.email_or_pwd_not_found)
        }
        return true;
      });
    }),
  check('password', messages.email_or_pwd_not_found)
    .isLength({ min: 5 })
    .isAlphanumeric(),
  authController.postLogin
);

router.post('/user-logout', checkCSRF, authController.postLogout);

module.exports = router;