import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact@biisiiventures.com	",
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = async ({ email, phoneNumber, message, fullName }) => {
  const info = await transporter.sendMail({
    from: "Kunal Salunkhe <kunalsalunkhe1600@gmail.com>",
    to: "salunkhekunal594@gmail.com",
    subject: `New Contact: ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
  });
  return info;
};
