import nodemailer from "nodemailer";
import "dotenv/config";
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),

  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Mailtrap Error:", error);
  } else {
    console.log("Mailtrap Connected");
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAILTRAP_SENDER,
      to,
      subject,
      html,
    });

    console.log("Email Sent:", info.messageId);

    return info;

  } catch (error) {
    throw error;
  }
};

export default sendEmail;