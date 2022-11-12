const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, homeController.getHome);

module.exports = router;
