import { Response, Request } from "express";
import { admUpdateService } from "../../services/adm/updateAdm.service";

export const admUpdateController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const id = req.user.id;

  const adm = await admUpdateService({
    id,
    name,
    email,
    password,
  });
  return res.status(200).json({ message: "Successfully updated" });
};
