const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Replace with your Gmail address
    pass: process.env.EMAIL_PASSWORD, // Replace with your Gmail password
  },
});

exports.sendEmail = async ({ firstname, email, phone, amount, address }) => {
  const mailOptions = {
    from: "your@gmail.com", // Replace with your Gmail address
    to: email,
    subject: "Donation Confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <p style="font-size: 18px; margin-bottom: 10px;">Dear <strong style="color: #007BFF;">${firstname}</strong>,</p>
        <p style="font-size: 16px; margin-bottom: 20px;">Thank you for your generous donation of Rs.<span style="font-weight: bold; color: #28A745;">${amount}</span> to our NGO. Your support is highly appreciated.</p>
        <div style="background-color: #F8F9FA; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          <p style="font-size: 16px; margin-bottom: 5px; font-weight: bold;">Confirmation Details:</p>
          <ul style="list-style-type: none; padding: 0;">
            <li style="font-size: 14px; margin-bottom: 5px;">Email: ${email}</li>
            <li style="font-size: 14px; margin-bottom: 5px;">Phone: ${phone}</li>
            <li style="font-size: 14px;">Address: ${address}</li>
          </ul>
        </div>
        <p style="font-size: 16px; margin-bottom: 20px;">We will be in touch with you shortly. If you have any further questions, feel free to contact us.</p>
        <p style="font-size: 16px; margin-bottom: 20px;">Thank you again for your contribution.</p>
        <p style="font-size: 14px; font-style: italic; color: #6C757D;">Best regards,<br>Your NGO Team (झाडे लावा झाडे
          जगवा)</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

