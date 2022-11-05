import { Router } from "express";
import { deleteUserByIdController } from "../controllers/adm/deleteUserById.controller";
import { getAllUsersController } from "../controllers/adm/getAllUsers.controller";
import { getUserByIdController } from "../controllers/adm/getUserById.controller";
import { createUserController } from "../controllers/user/createUser.controller";
import { deleteUserController } from "../controllers/user/deletUser.controller";
import { getUsersController } from "../controllers/user/getUsers.controller";
import { userUpdateController } from "../controllers/user/userUpdate.controller";
import { verifyAuthAdminMiddleware } from "../middleware/verifyAuthAdminMiddleware";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";

const router = Router();
router.post("", createUserController);
router.get("/profile", verifyAuthTokenMiddleware, getUsersController);
router.patch("/profile", verifyAuthTokenMiddleware, userUpdateController);
router.delete("/profile", verifyAuthTokenMiddleware, deleteUserController);

//routes adm pro user
router.delete("/:id", verifyAuthTokenMiddleware, verifyAuthAdminMiddleware, deleteUserByIdController);
router.get("", verifyAuthTokenMiddleware, verifyAuthAdminMiddleware, getAllUsersController)
router.get("/:id", verifyAuthTokenMiddleware, verifyAuthAdminMiddleware, getUserByIdController)


export default router;
