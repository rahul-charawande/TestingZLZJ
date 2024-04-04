const express = require("express");
const router = express.Router();

const donateInfoController = require("../controllers/mailController");
router.post("/submit-form", donateInfoController.submitForm);

module.exports = router;

