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
import { addPlaylistUserController } from "../controllers/user/playlist/addPlaylistUser.controller";
import { getIdPlaylistUsersController } from "../controllers/user/playlist/getIdPlaylistUser.controller";
import { getAllPlaylistUsersController } from "../controllers/user/playlist/getAllPlaylistUse.controller";

import { verifyAuthUserMiddleware } from "../middleware/verifyAuthUserMiddleware";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";
import { schemaValidationMiddleware } from "../middleware/schemaValidation.middleware";
import { addAvatarFile} from "../controllers/user/addAvatarFileAws";
import { checkIdMiddleware } from "../middleware/checkIdMiddleware";


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

userRouter.post(
  "/profile/avatar",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  addAvatarFile
);

userRouter.post(
  "/playlist",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  addPlaylistUserController
);
userRouter.get(
  "/playlist",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  getAllPlaylistUsersController
);
userRouter.get(
  "/playlist/:id_playlist",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  getIdPlaylistUsersController
);

//Only Adm

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
  checkIdMiddleware,
  getUserByIdController
);

userRouter.delete("/:id", verifyAuthTokenMiddleware,verifyAuthAdminMiddleware,checkIdMiddleware,deleteUserByIdController)
