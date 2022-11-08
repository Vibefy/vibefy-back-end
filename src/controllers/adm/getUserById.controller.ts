import { Response, Request } from "express";
import { getUserByIdService } from "../../services/adm/getUserById.service";

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserByIdService(id);
  
  return res.status(200).json(user);
};
