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
const sendMail = async(to, title, body) => {
  try {
    const info = await transporter.sendMail({
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

// send email to admin for become a seller
const WantSellerEmail = (to, customerEmail, storeName, mobile, location, message ) => {
  const body = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>New Seller Request!!</h2>
      <p><strong>Customer Email:</strong> ${customerEmail}</p>
      <p><strong>Store Name:</strong> ${storeName}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Message:</strong> ${message}</p>
      <br>
      <p>Check the admin dashboard for further actions.</p>
    </div>
  `
  return sendMail(to, "New Seller Request!", body);
}

// add this email to server code the fardiislamrupon@gmial.com is middle man like send user and send to admin to(ruponmia@gmail.com)
// WantSellerEmail("ruponmia97@gmail.com", "sidka", "sidkaalex@gmail.com", "Kannu", "01992992", "Moholgiri", "please approve me to become a seller");

// product purchase


// sendWelcomeEmail("sidlex@gmail.com");
// export { sendWelcomeEmail };
module.exports = { sendWelcomeEmail, WantSellerEmail };
