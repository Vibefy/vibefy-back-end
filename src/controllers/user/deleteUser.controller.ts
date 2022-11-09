import { Response, Request } from "express";
import { deleteUserService } from "../../services/user/deleteUser.service";

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.user;

  await deleteUserService(id);

  return res.status(204).send();
};
