const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const checkCSRF = require('../middleware/check-csrf');

router.get('/admin/home', isAuth, adminController.getHome);

router.get('/admin/manage-book', isAuth, adminController.getBookList);

router.get('/admin/manage-book/add', isAuth, adminController.getAddBook);

router.post('/admin/add-book', isAuth, checkCSRF, adminController.postAddBook);

router.get('/admin/manage-book/edit/:bookId', isAuth, adminController.getEditBook);

router.post('/admin/edit-book', isAuth, checkCSRF, adminController.postEditBook);

router.get('/admin/manage-book/delete/:bookId', isAuth, adminController.getDeleteBook);

router.get('/admin/manage-user', isAuth, adminController.getUserist);

module.exports = router;
