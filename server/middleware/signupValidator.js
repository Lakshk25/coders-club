const {body} = require('express-validator');

const emailValidation = body('email').isEmail().withMessage('Invalid email address').normalizeEmail();

const passwordValidation = body('password').isLength({min: 3}).withMessage('Password must be at leaset 3 characters')

module.exports = {
    emailValidation,
    passwordValidation
}