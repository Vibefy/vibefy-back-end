import { Router } from "express";

import { admCreate, admUpdate } from "../schema/adm";
import { IAdmRequest, IAdmUpdate } from "../interfaces/adm";

import { getAdmController } from "../controllers/adm/getAdm.controller";
import { admUpdateController } from "../controllers/adm/admUpdate.controller";
import { createAdmController } from "../controllers/adm/createAdm.controller";

import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { addAvatarFile } from "../controllers/adm/addAvatarFile";

const router = Router();
router.post(
  "",
  schemaValidationMiddleware<IAdmRequest>(admCreate),
  createAdmController
);
router.get(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  getAdmController
);
router.patch(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  schemaValidationMiddleware<IAdmUpdate>(admUpdate),
  admUpdateController
);
router.post("/profile/avatar",verifyAuthTokenMiddleware,verifyAuthAdminMiddleware,addAvatarFile)

export default router;
