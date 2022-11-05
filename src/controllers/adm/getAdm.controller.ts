import { Response, Request } from "express";
import { getAdmService } from "../../services/adm/getAdm.service";

export const getAdmController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const user = await getAdmService(id);
  return res.status(200).json(user);
};
