import cron from "node-cron";
import axios from "axios";
import MailService from "./services/MailService.js";

// 0 19 * * * => 7:00 pm

cron.schedule("* * * * *", async () => {
  try {
    const response = await axios.get(process.env.API_BACK, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    const { emails, message, subject } = response.data;

    if (!emails && !subject) {
      return console.log("No hay correos para enviar.");
    } else {
      return MailService.sendMail(emails, subject, message);
    }
  } catch (error) {
    return console.log(error);
  }
});
