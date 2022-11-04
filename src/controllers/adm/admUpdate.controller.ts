import { Response, Request } from "express";
import { userUpdateService } from "../../services/user/userUpdate.service";

export const admUpdateController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { id } = req.user;

  const adm = await userUpdateService({
    id,
    name,
    email,
    password,
  });
  return res.status(200).json({ message: "update adm" });
};
