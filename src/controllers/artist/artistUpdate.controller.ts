import { Response, Request } from "express";
import { artistUpdateService } from "../../services/artist/updateArtist.service";

export const artistUpdateController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { id } = req.user;
  await artistUpdateService({ id, name, email, password });
  return res.status(200).json({ message: "Profile updated" });
};
