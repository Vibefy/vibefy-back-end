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
    html: ` <table bgcolor="#7CE6FF" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
    <tr>
         <td align="center" height="200">
              <img src="../assets/logo.png" alt="Clinicas Aqui" style="display: block; width: 40%;" />
         </td>
    </tr>
    <!-- MAIN BODY -->
    <tr>
         <td bgcolor=" #7CE6FF" style="padding: 2em;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                   <tr>
                        <td align="center" style=" font-weight: 600; color: #03045e; font-family: Arial, sans-serif; font-size: 1.5em; padding-top: 2em;">
                            Clique no botão para ativar sua conta!
                        </td>
                   </tr>
                   <tr>
                        <td align="center" style="padding: 3em 0 1em;">
                             <button style="background-color: #729CF9; border-radius: 10px; border: 0; padding: 1em 2em;  font-family: Arial, sans-serif; font-size: 1.5rem;">
                                  <!-- precisa redirecionar para pagina com a rota + token -->
                                  <a style="text-decoration: none; font-weight: 600; color: #03045e;" href="https://vibefyproject.herokuapp.com" target="_blank">Confirmar conta</a>
                             </button>
                        </td>
                   </tr>
                   <tr>
                        <td align="center">
                             <img src="../assets/hospital.png" alt="" width="50%" style="display: block;" />
                        </td>
                   </tr>
                   <!-- RODAPE -->
                   <tr>

                        <td align="bottom" bgcolor="#7CE6FF" style="padding: 2em 2em 0;" >
                        
                             <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                       <td style="color: #03045e; font-family: Arial, sans-serif; font-size: 1rem;">
                                            &reg; Clínicas Aqui, feito para você 2022<br />
                                            Não foi voce que se cadastrou no nosso portal? <br /><a href="malito:clinicasaqui@outlook.com" style="color: #03045e;">Nos mande um email!</a> 
                                       </td>
                                  </tr>


                             </table>
                        </td>
                   </tr>
              </table>
</body>`,
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
