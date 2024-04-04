const mongoose = require("mongoose");

const pdfGenerateSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    pan: String,
    address: String,
    amount: String,
    date: String,
});

module.exports = mongoose.model("GeneratePdfInfo", pdfGenerateSchema);