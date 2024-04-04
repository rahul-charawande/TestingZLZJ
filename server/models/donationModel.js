const mongoose = require("mongoose");

const donateInfoSchema = new mongoose.Schema({
    firstname: String,
    email: String,
    phone: String,
    amount: String,
    address: String,
});

module.exports = mongoose.model("DonationInfo", donateInfoSchema);