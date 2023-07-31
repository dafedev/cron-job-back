import cron from "node-cron";
import axios from "axios";
import MailService from "./services/MailService.js";
import express from "express";

const app = express();

const programarRecordatorio = (fecha, hora, destinatarios, asunto, mensaje) => {
  try {
    console.log(hora, fecha);
    const cronExpresion = `0 ${hora.split(":")[1]} ${hora.split(":")[0]} ${
      fecha.split("-")[2]
    } ${fecha.split("-")[1]} *`;

    cron.schedule(cronExpresion, async () => {
      try {
        console.log("Enviando correo electrónico...");
        // Aquí puedes usar la función de envío de correos del MailService
        await MailService.sendMail(destinatarios, asunto, mensaje);
      } catch (error) {
        console.log("Error al enviar el correo electrónico:", error);
      }
    });
  } catch (error) {
    console.log("Error al programar el recordatorio:", error);
  }
};

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

app.get("/crear-recordatorio", (req, res) => {
  const { fecha, hora, emails } = req.query;
  console.log(req.query);
  const destinatarios = [emails];
  const asunto = "Recordatorio"; // Ejemplo de asunto
  const mensaje = "Recuerda la tarea importante"; // Ejemplo de mensaje
  programarRecordatorio(fecha, hora, destinatarios, asunto, mensaje);
  res.send("Recordatorio creado con éxito");
});
