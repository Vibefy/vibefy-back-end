import { Router } from "express";

import { login } from "../schema/session";
import { ILogin } from "../interfaces/session";

import { sessionController } from "../controllers/user/session.controller";

import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";

const router = Router();
router.post("",schemaValidationMiddleware<ILogin>(login),sessionController)

export default router;
