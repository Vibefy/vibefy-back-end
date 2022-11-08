import { Router } from "express";

import { userCreate, userUpdate } from "../schema/user";
import { IUserRequest, IUserUpdate } from "../interfaces/users";

import { getUsersController } from "../controllers/user/getUsers.controller";
import { createUserController } from "../controllers/user/createUser.controller";
import { deleteUserController } from "../controllers/user/deleteUser.controller";
import { userUpdateController } from "../controllers/user/userUpdate.controller";
import { getAllUsersController } from "../controllers/adm/getAllUsers.controller";
import { getUserByIdController } from "../controllers/adm/getUserById.controller";
import { deleteUserByIdController } from "../controllers/adm/deleteUserById.controller";

import { verifyAuthUserMiddleware } from "../middleware/verifyAuthUserMiddleware";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { addAvatarFile } from "../controllers/user/addAvatarFileAws";

export const userRouter = Router();

userRouter.post(
  "",
  schemaValidationMiddleware<IUserRequest>(userCreate),
  createUserController
);
userRouter.get(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  getUsersController
);
userRouter.patch(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  schemaValidationMiddleware<IUserUpdate>(userUpdate),
  userUpdateController
);
userRouter.delete(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  deleteUserController
);

userRouter.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  deleteUserByIdController
);
userRouter.get(
  "",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  getAllUsersController
);
userRouter.get(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  getUserByIdController
);

userRouter.post(
  "/profile/avatar",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  addAvatarFile
);

export default userRouter;
