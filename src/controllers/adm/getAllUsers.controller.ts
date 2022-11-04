import { Response, Request } from "express";
import { getAllUsersService } from "../../services/adm/getAllUsers.service";


export const getAllUsersController = async (req: Request, res: Response) => {
  const user = await getAllUsersService();
  return res.status(200).json(user);
};
