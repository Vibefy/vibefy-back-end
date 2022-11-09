import { Response, Request } from "express";
import { getUsersService } from "../../services/user/getUsers.service";

export const getUsersController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await getUsersService(id);

  return res.status(200).json(user);
};
