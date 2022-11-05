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
        to: "ovictoravila@gmail.com",
        subject: "Welcome to Vibefy",
        text: "O vibefy tem como base a ideia de o consumidor não tem tempo para,  pesquisar  as  músicas, favoritar  e  criar  suas  playlist. Então  vamos  facilitar  para  o consumidor",
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
exports.mailController = mailController;
