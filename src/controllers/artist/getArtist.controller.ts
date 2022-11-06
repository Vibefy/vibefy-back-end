import { Response, Request } from "express";
import { getArtistService } from "../../services/artist/getArtist.service";

export const getArtistController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const artist = await getArtistService(id);
  return res.status(200).json(artist);
};
