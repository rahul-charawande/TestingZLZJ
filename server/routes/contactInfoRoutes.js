const express = require("express");
const router = express.Router();
const contactInfoController = require("../controllers/contactInfoController");

router.post("/api/contact", contactInfoController.saveContactInfo);

module.exports = router;
