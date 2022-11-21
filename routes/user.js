const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');
const { check } = require('express-validator');
const validationMessages = require('../public/data/messages.json')[0].validation_messages
const checkCSRF = require('../middleware/check-csrf');

router.get('/user/home', isAuth, userController.getHome);

router.get('/user/book', isAuth, userController.getUserBook);

router.get('/user/book/add', isAuth, userController.getBookList);

router.get('/user/book/add/:bookId', isAuth, userController.getAddBook);

router.post('/user/add-book',
  isAuth,
  checkCSRF,
  check('finishedAt')
    .custom((value, { req }) => {
      if (req.body.status === 'read') {
        const addedAt = new Date().toISOString().slice(0, 10);
        if (!value) {
          return Promise.reject(validationMessages.finishedAt_empty);
        }
        if (value <= addedAt) {
          return Promise.reject(validationMessages.finishedAt_outOfBounds);
        }
      } else {
        if (value) {
          return Promise.reject(validationMessages.finishedAt_notEmpty);
        }
      }
      return true;
    }),
  check('score')
    .custom((value, { req }) => {
      if (req.body.status === 'read') {
        if (!value) {
          return Promise.reject(validationMessages.score_empty);
        }
        if (value < 0 || value > 10) {
          return Promise.reject(validationMessages.score_outOfBounds);
        }
      } else {
        if (value) {
          return Promise.reject(validationMessages.score_notEmpty);
        }
      }
      return true;
    }),
  check('status')
    .custom((value, { req }) => {
      if (!value) {
        return Promise.reject(validationMessages.status_empty);
      }
      return true;
  }),
  userController.postAddBook
);

router.get('/user/book/edit/:bookId', isAuth, userController.getUpdateBook);

router.post('/user/edit-book',
  isAuth,
  checkCSRF,
  check('finishedAt')
    .custom((value, { req }) => {
      if (req.body.status === 'read') {
        if (!value) {
          return Promise.reject(validationMessages.finishedAt_empty);
        }
        const addedAt = new Date().toISOString().slice(0, 10);
        if (value <= addedAt) {
          return Promise.reject(validationMessages.finishedAt_outOfBounds);
        }
      } else {
        if (value) {
          return Promise.reject(validationMessages.finishedAt_notEmpty);
        }
      }
      return true;
    }),
  check('score')
    .custom((value, { req }) => {
      if (req.body.status === 'read') {
        if (!value) {
          return Promise.reject(validationMessages.score_empty);
        }
        if (value < 0 || value > 10) {
          return Promise.reject(validationMessages.score_outOfBounds);
        }
      } else {
        if (value) {
          return Promise.reject(validationMessages.score_notEmpty);
        }
      }
      return true;
    }),
  check('status')
    .custom((value, { req }) => {
      if (!value) {
        return Promise.reject(validationMessages.status_empty);
      }
      return true;
  }),
  userController.postUpdateBook
);

router.get('/user/book/remove/:bookId', isAuth, userController.getRemoveBook);

module.exports = router;
