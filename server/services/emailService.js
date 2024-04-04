const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send confirmation email
exports.sendConfirmationEmail = async (name, email, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Replace with your Gmail address
    to: email,
    subject: "Contact Information Received",
    html: `
      <p>Dear <strong>${name}</strong>,</p>
      <p>Thank you for reaching out to us. We have received your contact information and will get back to you as soon as possible.</p>
      <p>Your Message:</p>
      <p>${message}</p>
      <p>Best regards,<br>Your NGO Team (झाडे लावा झाडे जगवा)</p>
    `,
  };

  // Send the confirmation email
  await transporter.sendMail(mailOptions);
};
