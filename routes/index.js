const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const { forgotPassword } = require('../mailers/forgot_password_mailer');
const { route } = require('./posts');
const forgotPasswordController = require('../controllers/forgotPassword_controller');

console.log('Router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.get('/forgot-password', forgotPasswordController.forgotPassword);

router.use('/api', require('./api'));

module.exports = router;