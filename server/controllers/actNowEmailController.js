const { sendActEmail } = require('../services/actNowEmailService');

   const submitActForm  = async (req, res) => {
  try {
    const { firstName, lastName, email, address, message } = req.body;
    console.log(firstName, lastName, email, address, message);
    console.log("Received form data:", req.body);

    // Call the service to send the email
    await sendActEmail(firstName, lastName, email, address, message);

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
}

module.exports = {
  submitActForm,
};
