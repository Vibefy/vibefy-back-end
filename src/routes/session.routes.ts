import { Router } from "express";
import { sessionController } from "../controllers/user/session.controller";
import { ILogin } from "../interfaces/session";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { login } from "../schema/session";

const router = Router();
router.post("",schemaValidationMiddleware<ILogin>(login),sessionController)

export default router;
