import { Response, Request } from "express";
import { sessionService } from "../../services/session/session.service";

export const sessionController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await sessionService({ email, password });
  return res.status(200).json(token);
};
