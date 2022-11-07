import { Request, Response } from "express";
import { createMusicService } from "../../../services/artist/music/createMusic.service";

export const createMusicController = async (req: Request, res: Response) => {
  const {name, artist, genre, description, duration} = req.body
  const music = await createMusicService({name,artist,genre,description,duration})
  return res.status(201).json(music)
};
