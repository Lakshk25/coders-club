const express = require('express');
const tokenValidator = require('../middleware/tokenValidator');
const questionsController = require('../controllers/questionsController');
const router = express.Router();

router.post('/create', tokenValidator, questionsController.createQuestion);
router.put('/update', tokenValidator, questionsController.updateQuestion);
router.get('/all', tokenValidator, questionsController.getAllQuestion);

module.exports = router