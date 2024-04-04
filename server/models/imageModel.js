const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: String,
    path: String,
    activityName: String,
    caption: String,
    // description: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  module.exports = mongoose.model("Image", imageSchema);