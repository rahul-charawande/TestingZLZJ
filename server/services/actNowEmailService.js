const nodemailer = require("nodemailer");

const sendActEmail = async (firstName, lastName, email, address, message) => {
  const mailOptions = {
    from: `${email}`,
    to: "rti-pmo.applications@gov.in",
    subject: "Form Submission",
    html: `
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  sendActEmail,
};
