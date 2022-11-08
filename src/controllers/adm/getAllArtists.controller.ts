import { Response, Request } from "express";
import { getAllArtistsService } from "../../services/adm/getAllArtists.service";

export const getAllArtistsController = async (req: Request, res: Response) => {
  const artist = await getAllArtistsService() ;
  
  return res.status(200).json(artist);
};
