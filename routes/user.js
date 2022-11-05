const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/user/home', userController.getHome);

router.get('/user/book', userController.getUserBook);

router.get('/user/book/add', userController.getBookList);

router.get('/user/book/detail/:bookId', userController.getBookDetail);

module.exports = router;