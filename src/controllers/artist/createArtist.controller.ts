import { Request, Response } from "express";
import { createArtistService } from "../../services/artist/createArtist.service";

export const createArtistController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const artist = await createArtistService({ name, email, password });
  
  return res.status(201).json(artist);
};
