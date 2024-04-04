const DonationInfo = require("../models/donationModel");
const { sendEmail } = require("../services/donateFromMailService");

exports.submitForm = async (req, res) => {
  try {
    const { firstname, email, phone, amount, address } = req.body;
    const donation = new DonationInfo({
      firstname,
      email,
      phone,
      amount,
      address,
    });
    await donation.save();
    console.log("donation mail sent", donation);
    await sendEmail({ firstname, email, phone, amount, address });
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }
};
