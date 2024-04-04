const express = require('express');
const submitActFormController = require('../controllers/actNowEmailController');

const router = express.Router();

router.post("/act-now", submitActFormController.submitActForm);

module.exports = router;
