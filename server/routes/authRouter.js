const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { passwordValidation, emailValidation } = require('../middleware/signupValidator');

router.post('/signup', [passwordValidation, emailValidation], authController.signupController);
router.post('/login', authController.loginController);

module.exports = router