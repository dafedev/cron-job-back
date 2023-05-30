import { Transporter } from "../config/transporter.js";

const sendMail = async (emails, subject, message) => {
  try {
    for (const email of emails) {
      await Transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: email,
        subject,
        html: message,
      });
    }
    console.log("Correo enviado.");
  } catch (error) {
    return console.log(error);
  }
};

export default { sendMail };
