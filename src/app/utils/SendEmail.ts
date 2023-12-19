import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "imwahidgoni17@gmail.com",
      pass: "maxb kuxz vppj vsuu",
    },
  });

  await transporter.sendMail({
    from: "imwahidgoni17@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset your Password", // Subject line
    text: "Reset Your Password within 10 minutes", // plain text body
    html, // html body
  });
};
