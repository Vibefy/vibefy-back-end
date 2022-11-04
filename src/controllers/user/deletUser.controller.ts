import { Response, Request } from "express";
import { deleteUserService } from "../../services/user/deleteUser.service";

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const user = await deleteUserService(id);
  return res.status(204).json({ menssage: "usuario desativado" });
};
