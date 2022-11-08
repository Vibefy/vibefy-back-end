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

const router = Router();

router.post(
  "",
  schemaValidationMiddleware<IUserRequest>(userCreate),
  createUserController
);
router.get(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  getUsersController
);
router.patch(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  schemaValidationMiddleware<IUserUpdate>(userUpdate),
  userUpdateController
);
router.delete(
  "/profile",
  verifyAuthTokenMiddleware,
  verifyAuthUserMiddleware,
  deleteUserController
);

//routes adm pro user
router.delete(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  deleteUserByIdController
);
router.get(
  "",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  getAllUsersController
);
router.get(
  "/:id",
  verifyAuthTokenMiddleware,
  verifyAuthAdminMiddleware,
  getUserByIdController
);
router.post("/profile/avatar",verifyAuthTokenMiddleware,verifyAuthUserMiddleware,addAvatarFile)

export default router;
