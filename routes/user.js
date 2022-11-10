const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/user/home', userController.getHome);

router.get('/user/book', userController.getUserBook);

router.get('/user/book/add', userController.getBookList);

router.get('/user/book/add/:bookId', userController.getAddBook);

router.post('/user/add-book', userController.postAddBook);

router.get('/user/book/edit/:bookId', userController.getUpdateBook);

router.post('/user/edit-book', userController.postUpdateBook);

router.get('/user/book/remove/:bookId', userController.getRemoveBook);

module.exports = router;