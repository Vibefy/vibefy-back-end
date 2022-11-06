import { Router } from "express";
import { admUpdateController } from "../controllers/adm/admUpdate.controller";
import { createAdmController } from "../controllers/adm/createAdm.controller";
import { getAdmController } from "../controllers/adm/getAdm.controller";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";

const router = Router();
router.post("", createAdmController);
router.get("/profile",verifyAuthTokenMiddleware,verifyAuthAdminMiddleware,getAdmController);
router.patch("/profile", verifyAuthTokenMiddleware,verifyAuthAdminMiddleware, admUpdateController);


export default router;
