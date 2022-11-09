import { Router } from "express";

import { admCreate, admUpdate } from "../schema/adm";
import { IAdmRequest, IAdmUpdate } from "../interfaces/adm";

import { addAvatarFile } from "../controllers/adm/addAvatarFile";
import { getAdmController } from "../controllers/adm/getAdm.controller";
import { admUpdateController } from "../controllers/adm/admUpdate.controller";
import { createAdmController } from "../controllers/adm/createAdm.controller";

import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";

const routes = Router();

export const admRoutes = () => {
  routes.post(
    "",
    schemaValidationMiddleware<IAdmRequest>(admCreate),
    createAdmController
  );

  routes.get(
    "/profile",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    getAdmController
  );

  routes.patch(
    "/profile",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    schemaValidationMiddleware<IAdmUpdate>(admUpdate),
    admUpdateController
  );

  routes.post(
    "/profile/avatar",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    addAvatarFile
  );

  return routes;
};
