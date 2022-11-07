import { Response, Request } from "express";
import { createAdmService } from "../../services/adm/createAdm.service";

export const createAdmController = async (req: Request, res: Response) => {
  const { name, email, password, admHash } = req.body;
  const user = await createAdmService({ name, email, password, admHash });
  return res.status(201).json(user);
};
