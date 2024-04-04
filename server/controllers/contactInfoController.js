const ContactInfo = require("../models/contactInfoModel");
const { sendConfirmationEmail } = require("../services/emailService");

exports.saveContactInfo = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContactInfo = new ContactInfo({ name, email, message });
    await newContactInfo.save();

    // Send confirmation email to the user
    await sendConfirmationEmail(name, email, message);

    res.status(201).json({ message: "Contact information saved successfully" });
  } catch (error) {
    console.error("Error saving contact information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
