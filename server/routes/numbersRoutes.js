const express = require('express');
const router = express.Router();
const numberInfoController = require("../controllers/numberController");

router.get('/getNumbers', numberInfoController.getNumbers);
router.post('/addNumbers', numberInfoController.addNumbers);
module.exports = router;