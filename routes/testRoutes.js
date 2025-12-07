const express = require('express');
const router = express.Router();
const TestController = require('../controllers/testController');

router.get('/:testId', TestController.getByTestId);

module.exports = router;
