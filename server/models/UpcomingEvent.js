const mongoose = require("mongoose");

// Define a schema for the UpcomingEvent model
const upcomingEventSchema = new mongoose.Schema({
    eventName: String,
    eventDescription: String,
    eventUpDate: Date,
    startTime: String,
    endTime: String,
  });

 module.exports = mongoose.model("UpcomingEvent", upcomingEventSchema);