const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("ContactInfo", contactInfoSchema);
