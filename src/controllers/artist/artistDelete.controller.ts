import { Response, Request } from "express";
import { deleteArtistService } from "../../services/artist/deleteArtist.service";

export const deleteArtistController = async (req: Request, res: Response) => {
  const { id } = req.user;
  await deleteArtistService(id);
  return res.status(204).json({ message: "Successfully deleted" });
};
