"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailController = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = nodemailer_1.default.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "bf5fec2f142a1c",
            pass: "389cd686ffc34b",
        },
    });
    const message = {
        from: "noreplay@vibefy.com.br",
        to: "gabrielfraygarandy@gmail.com",
        subject: "Welcome to Vibefy",
        text: "O vibefy tem como base a ideia de o consumidor não tem tempo para,  pesquisar  as  músicas, favoritar  e  criar  suas  playlist. Então  vamos  facilitar  para  o consumidor",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Confirm Account ClínicasAqui!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
    
      <body style="margin: 0; padding: 0">
        <!-- HEADER -->
        <table
          bgcolor="#d0bdf4"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="600"
        >
          <tr>
            <td align="center" height="200">
              <img
                src="./assets/alien.svg"
                alt="Clinicas Aqui"
                style="display: block; width: 40%"
              />
            </td>
          </tr>
          <!-- MAIN BODY -->
          <tr>
            <td bgcolor="#1D1D1D" style="padding: 2em">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td
                    align="center"
                    style="
                      font-weight: 600;
                      color: #d0bdf4;
                      font-family: Arial, sans-serif;
                      font-size: 1.5em;
                      padding-top: 2em;
                    "
                  >
                    Clique no botão para ativar sua conta!
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 3em 0 1em">
                    <button
                      style="
                        background-color: #8458b3;
                        border-radius: 10px;
                        border: 0;
                        padding: 1em 2em;
                        font-family: Arial, sans-serif;
                        font-size: 1.5rem;
                      "
                    >
                      <!-- precisa redirecionar para pagina com a rota + token -->
                      <a
                        style="
                          text-decoration: none;
                          font-weight: 600;
                          color: #d0bdf4;
                        "
                        href="https://htttinder.herokuapp.com/email/:tokenEmail"
                        target="_blank"
                        >Confirmar conta</a
                      >
                    </button>
                  </td>
                </tr>
                <!-- RODAPE -->
                <tr>
                  <td align="bottom" bgcolor="#1D1D1D" style="padding: 2em 2em 0">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td
                          style="
                            color: #d0bdf4;
                            font-family: Arial, sans-serif;
                            font-size: 1rem;
                          "
                        >
                          &reg; Vibefy, Don't wait for the vibe, Play it!<br />
                          Não foi você que se cadastrou? <br /><a
                            href="malito:clinicasaqui@outlook.com"
                            style="color: #d0bdf4"
                            >Nos mande um email!</a
                          >
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>    
    `,
    };
    transport.sendMail(message, (err) => {
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
});
exports.mailController = mailController;
