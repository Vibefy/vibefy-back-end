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
  "/profile",
  verifyAuthTokenMiddleware,
  getUsersController
);
router.patch("/profile", verifyAuthTokenMiddleware, userUpdateController);
router.delete(
  "/profile",
  verifyAuthTokenMiddleware,
  deleteUserController
);

export default router;
