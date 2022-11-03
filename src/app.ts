import express, { Request, Response } from "express";
import { sessionRoute } from "./routes/session.route";
import { userRoute } from "./routes/user.route";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import nodemailer from "nodemailer";

const app = express();

app.use("/user", userRoute);
app.use("/login", sessionRoute);

app.get("/send-email", async (req, res) => {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bf5fec2f142a1c",
      pass: "389cd686ffc34b",
    },
  });

  var message = {
    from: "noreplay@vibefy.com.br",
    to: "ovictoravila@gmail.com",
    subject: "Welcome to Vibefy",
    text: "Don't wait for the vibe, play it",
    html: "<p>O vibefy tem como base a ideia de o consumidor não tem tempo para,  pesquisar  as  músicas, favoritar  e  criar  suas  playlist. Então  vamos  facilitar  para  o consumidor</p>",
  };

  transport.sendMail(message, (err) => {
    if (err)
      return res.status(400).json({
        error: true,
        message: "Erro: E-mail não enviado com sucesso!",
      });
  });

  return res.json({
    error: false,
    message: "E-mail enviado com sucesso!",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/terms", (req: Request, res: Response) => {
  return res.json({
    message: "Termos de Serviço",
  });
});

export default app;
