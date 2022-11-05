import { Router } from "express";
import { createUserController } from "../controllers/userController/createUser.controller";
import { deleteUserController } from "../controllers/userController/deletUser.controller";
import { getUsersController } from "../controllers/userController/getUsers.controller";
import { userUpdateController } from "../controllers/userController/userUpdate.controller";
import { IUser, IUserRequest } from "../interfaces/users";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { userCreate } from "../schema/user";

const router = Router();
router.post("",schemaValidationMiddleware<IUserRequest>(userCreate),createUserController);
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
