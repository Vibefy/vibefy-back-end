import { Router } from "express";
import { admUpdateController } from "../controllers/adm/admUpdate.controller";
import { createAdmController } from "../controllers/adm/createAdm.controller";
import { getAdmController } from "../controllers/adm/getAdm.controller";
import { IAdmRequest, IAdmUpdate } from "../interfaces/adm";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { admCreate,admUpdate } from "../schema/adm";

const router = Router();
router.post("",schemaValidationMiddleware<IAdmRequest>(admCreate),createAdmController);
router.get("/profile",verifyAuthTokenMiddleware,verifyAuthAdminMiddleware,getAdmController);
router.patch("/profile", verifyAuthTokenMiddleware,verifyAuthAdminMiddleware,schemaValidationMiddleware<IAdmUpdate>(admUpdate),admUpdateController);


export default router;
