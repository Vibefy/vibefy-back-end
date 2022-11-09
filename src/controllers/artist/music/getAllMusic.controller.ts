import { Response, Request } from "express";
import { getAllMusicService } from "../../../services/artist/music/getAllMusic.service";

export const getAllMusicArtistController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.user;

  const music = await getAllMusicService(id);
  
  return res.status(200).json(music);
};
