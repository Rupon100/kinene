const nodemailer = require("nodemailer");
require("dotenv").config();

// create transport
const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// send mail function
const sendMail = (to, title, body) => {
  try {
    const info = transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: title,
      html: body,
    });
    console.log("Email sent: ", info);
    return info;
  } catch (err) {
    console.log("Failed send email from emailService: ", err.message);
  }
};

// specific email helpers for welcome email
const sendWelcomeEmail = (to) => {
  const body = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;" >
                    <h2>Welcome to our App 🎉.</h2> 
                    <p>Hi there,</p> 
                    <p>Thanks for joining us! We’re excited to have you onboard.</p>
                    <p>Stay tuned for upcoming features and updates.</p> 
                    <br>
                    <p>Team Kinene</p>
                </div>`;
  return sendMail(to, "Welcome to our App!", body);
};

// product purchase

// email send to admin for seller || admin to seller that upgraded

// sendWelcomeEmail("sidlex@gmail.com");
// export { sendWelcomeEmail };
module.exports = { sendWelcomeEmail };
