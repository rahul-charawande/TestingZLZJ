const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: String,
  date: String,
  caption: String,
  description: String,
  category: String,
  thumbnail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  imageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
