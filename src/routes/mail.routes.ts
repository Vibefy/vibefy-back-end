import { Router } from "express";

import { mailController } from "../controllers/mail.controller";

const mailRoute = Router();

mailRoute.get("", mailController);

export { mailRoute };
