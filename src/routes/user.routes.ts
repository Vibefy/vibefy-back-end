import { Router } from "express";
import { createUserController } from "../controllers/user/createUser.controller";
import { deleteUserController } from "../controllers/user/deletUser.controller";
import { getUsersController } from "../controllers/user/getUsers.controller";
import { userUpdateController } from "../controllers/user/userUpdate.controller";
import { verifyAuthTokenMiddleware } from "../middleware/verifyAuthTokenMiddleware";

const router = Router();
router.post("", createUserController);
router.get("/profile", verifyAuthTokenMiddleware, getUsersController);
router.patch("/profile", verifyAuthTokenMiddleware, userUpdateController);
router.delete("/profile", verifyAuthTokenMiddleware, deleteUserController);

export default router;
