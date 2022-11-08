import { Response, Request } from "express";
import { createUserService } from "../../services/user/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await createUserService({ name, email, password });
  
  return res.status(201).json(user);
};
