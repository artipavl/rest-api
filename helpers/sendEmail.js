// const sgMail = require("@sendgrid/mail");
// // require("dotenv").config();

// const { SENDGRID_API_KEY, FROM_EMAIL } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//     const email = { ...data, from: FROM_EMAIL };
//     await sgMail.send(email);
//     return true;
// }

const nodemailer = require("nodemailer");

const { FROM_EMAIL, PASS_EMAIL } = process.env;

const sendEmail = async (data) => {
  await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: FROM_EMAIL,
      pass: PASS_EMAIL,
    },
  });

  const email = { ...data, from: FROM_EMAIL };

  await transporter.sendMail(email);

  return true;
};

module.exports = sendEmail;
