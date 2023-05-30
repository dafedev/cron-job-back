import cron from "node-cron";
import axios from "axios";
import MailService from "./services/MailService.js";

const main = async (exitProcess = false) => {
  try {
    const response = await axios.get(process.env.API_BACK, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    const { emails, message, subject } = response.data;

    if (!emails && !subject) {
      console.log("No hay correos para enviar.");
      return exitProcess && process.exit(1)
    } else {
      await MailService.sendMail(emails, subject, message);
      return exitProcess && process.exit(1)
    }
  } catch (error) {
    console.log(error);
    return exitProcess && process.exit(1)
  }
}

// 0 19 * * * => 7:00 pm
// cron.schedule("* * * * *", () => main());

main(true)
