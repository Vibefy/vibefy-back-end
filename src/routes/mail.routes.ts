import { Router } from "express";

import { mailController } from "../controllers/mail.controller";

export const mailRouter = Router();

mailRouter.get("", mailController);
