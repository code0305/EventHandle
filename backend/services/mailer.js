import nodemailer from "nodemailer"
import "dotenv/config";
// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
    service:'gmail',
  auth: {
    user: process.env.user_email,
    pass: process.env.user_password,
  },
});

const sendEmail = async (to,subject,html) => {
    await transporter.sendMail(
        {
            from:process.env.user_email,
            to,
            subject,
            html
        }
    )
}
export default sendEmail;