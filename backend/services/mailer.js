import nodemailer from "nodemailer"
import "dotenv/config";
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