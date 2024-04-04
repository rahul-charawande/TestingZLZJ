const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

router.get("/activities", activityController.getActivities);
router.get("/activities/latest", activityController.latestGetActivities);
router.get("/activity/:id", activityController.getActivitiesById);
router.post("/postactivities", activityController.postActivities);
// Add other activity routes as needed

module.exports = router;
