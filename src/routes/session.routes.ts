import { Router } from "express";

import { login } from "../schema/session";
import { ILogin } from "../interfaces/session";

import { sessionController } from "../controllers/user/session.controller";

import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";

export const sessionRouter = Router();
sessionRouter.post(
  "",
  schemaValidationMiddleware<ILogin>(login),
  sessionController
);
