import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const mailController = async (req: Request, res: Response) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bf5fec2f142a1c",
      pass: "389cd686ffc34b",
    },
  });

  const message = {
    from: "noreplay@vibefy.com.br",
    to: "ovictoravila@gmail.com",
    subject: "Welcome to Vibefy",
    text: "O vibefy tem como base a ideia de o consumidor não tem tempo para,  pesquisar  as  músicas, favoritar  e  criar  suas  playlist. Então  vamos  facilitar  para  o consumidor",
    html: "<p>O vibefy tem como base a ideia de o consumidor não tem tempo para,  pesquisar  as  músicas, favoritar  e  criar  suas  playlist. Então  vamos  facilitar  para  o consumidor</p>",
  };

  transport.sendMail(message, (err: Error) => {
    if (err)
      return res.status(400).json({
        error: true,
        message: "Error: E-mail not sent",
      });
  });

  return res.json({
    error: false,
    message: "E-mail successfully sent!",
  });
};
