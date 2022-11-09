import { Response, Request } from "express";
import { deleteArtistService } from "../../services/artist/deleteArtist.service";

export const deleteArtistController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteArtistService(id);
  
  return res.status(204).send();
};
