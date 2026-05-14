// import nodemailer from "nodemailer"
// import "dotenv/config";
// const transporter = nodemailer.createTransport({
//     service:'gmail',
//   auth: {
//     user: process.env.USER_EMAIL,
//     pass: process.env.USER_PASSWORD,
//   },
//   family: 4,
// });

// const sendEmail = async (to,subject,html) => {
//     await transporter.sendMail(
//         {
//             from:process.env.USER_EMAIL,
//             to,
//             subject,
//             html
//         }
//     )
// }
// export default sendEmail;

import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: 587,

  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAILTRAP_SENDER,
      to,
      subject,
      html,
    });

    console.log(info.messageId);

    return true;

  } catch (error) {
    console.log(error);

    return false;
  }
};
export default sendEmail;