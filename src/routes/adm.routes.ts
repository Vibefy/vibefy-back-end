import { Router } from "express";

import { admCreate, admUpdate } from "../schema/adm";
import { IAdmRequest, IAdmUpdate } from "../interfaces/adm";

import { getAdmController } from "../controllers/adm/getAdm.controller";
import { admUpdateController } from "../controllers/adm/admUpdate.controller";
import { createAdmController } from "../controllers/adm/createAdm.controller";

import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";

export const admRouter = Router();
admRouter.post(
  "",
  schemaValidationMiddleware<IAdmRequest>(admCreate),
  createAdmController
);
admRouter.get(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  getAdmController
);
admRouter.patch(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  schemaValidationMiddleware<IAdmUpdate>(admUpdate),
  admUpdateController
);
