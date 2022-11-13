const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middleware/is-auth');
const checkCSRF = require('../middleware/check-csrf');

router.get('/user/home', isAuth, userController.getHome);

router.get('/user/book', isAuth, userController.getUserBook);

router.get('/user/book/add', isAuth, userController.getBookList);

router.get('/user/book/add/:bookId', isAuth, userController.getAddBook);

router.post('/user/add-book', isAuth, checkCSRF, userController.postAddBook);

router.get('/user/book/edit/:bookId', isAuth, userController.getUpdateBook);

router.post('/user/edit-book', isAuth, checkCSRF, userController.postUpdateBook);

router.get('/user/book/remove/:bookId', isAuth, userController.getRemoveBook);

module.exports = router;
