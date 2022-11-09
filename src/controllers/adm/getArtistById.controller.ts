import { Response, Request } from "express";
import { getArtistByIdService } from "../../services/adm/getArtistById.service";

export const getArtistByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const artist = await getArtistByIdService(id);
  
  return res.status(200).json(artist);
};
