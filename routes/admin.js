const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/admin/home', adminController.getHome);

router.get('/admin/manage-book', adminController.getBookList);

router.get('/admin/manage-book/add', adminController.getAddBook);

router.post('/admin/add-book', adminController.postAddBook);

router.get('/admin/manage-book/edit/:bookId', adminController.getEditBook);

router.post('/admin/edit-book', adminController.postEditBook);

router.get('/admin/manage-book/delete/:bookId', adminController.getDeleteBook);

router.get('/admin/manage-user', adminController.getUserist);

module.exports = router;
