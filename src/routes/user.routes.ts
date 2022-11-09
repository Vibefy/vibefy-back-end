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
import { deleteIdPlaylistUsersController } from "../controllers/user/playlist/deleteIdPlaylistUser.controller";

import { addAvatarFile} from "../controllers/user/addAvatarFileAws";
import { checkIdMiddleware } from "../middleware/checkIdMiddleware";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "",
    schemaValidationMiddleware<IUserRequest>(userCreate),
    createUserController
  );

  routes.get(
    "/profile",
    verifyAuthTokenMiddleware,
    verifyAuthUserMiddleware,
    getUsersController
  );

  routes.patch(
    "/profile",
    verifyAuthTokenMiddleware,
    verifyAuthUserMiddleware,
    schemaValidationMiddleware<IUserUpdate>(userUpdate),
    userUpdateController
  );

  routes.delete(
    "/profile",
    verifyAuthTokenMiddleware,
    verifyAuthUserMiddleware,
    deleteUserController
  );

  routes.post(
    "/profile/avatar",
    verifyAuthTokenMiddleware,
    verifyAuthUserMiddleware,
    addAvatarFile
  );

  routes.post(
    "/playlist/:id_playlist",
    verifyAuthTokenMiddleware,
    verifyAuthUserMiddleware,
    addPlaylistUserController
  );

  routes.get(
    "/playlist",
    verifyAuthTokenMiddleware,
    verifyAuthUserMiddleware,
    getAllPlaylistUsersController
  );

  routes.get(
    "/playlist/:id_playlist",
    verifyAuthTokenMiddleware,
    verifyAuthUserMiddleware,
    getIdPlaylistUsersController
  );

  routes.delete(
    "/playlist/:id_playlist",
    verifyAuthTokenMiddleware,
    verifyAuthUserMiddleware,
    deleteIdPlaylistUsersController
  );

  //Only Adm

  routes.get(
    "",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    getAllUsersController
  );

  routes.get(
    "/:id",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    checkIdMiddleware,
    getUserByIdController
  );

  routes.delete(
    "/:id",
    verifyAuthTokenMiddleware,
    verifyAuthAdminMiddleware,
    checkIdMiddleware,
    deleteUserByIdController
  );

  return routes;
};
