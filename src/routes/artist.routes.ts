import { Router } from "express";
import { createAdmController } from "../controllers/adm/createAdm.controller";

const artistRouter = Router();
artistRouter.post("", createAdmController);

export { artistRouter };
