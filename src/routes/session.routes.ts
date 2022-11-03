import { Router } from "express";
import { sessionController } from "../controllers/userController/session.controller";

const router = Router();
router.post("", sessionController);

export default router;
