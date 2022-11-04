import { Router } from "express";
import { createUserController } from "../controllers/userController/createUser.controller";
import { deleteUserController } from "../controllers/userController/deletUser.controller";
import { getUsersController } from "../controllers/userController/getUsers.controller";
import { userUpdateController } from "../controllers/userController/userUpdate.controller";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";

const router = Router();
router.post("", createUserController);
router.get(
  "",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  getUsersController
);
router.patch("/user/profile", verifyAuthTokenMiddleware, userUpdateController);
router.delete(
  "/user/profile",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  deleteUserController
);

export default router;
