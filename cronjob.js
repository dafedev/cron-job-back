import cron from "node-cron";
import axios from "axios";
import MailService from "./services/MailService.js";

const main = async () => {
  try {
    const response = await axios.get(process.env.API_BACK, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    const { emails, message, subject } = response.data;

    if (!emails && !subject) {
      console.log("No hay correos para enviar.");
    } else {
      await MailService.sendMail(emails, subject, message);
    }
  } catch (error) {
    console.log(error);
  }
}

// 0 19 * * * => 7:00 pm
cron.schedule("30 21 * * *", () => main());