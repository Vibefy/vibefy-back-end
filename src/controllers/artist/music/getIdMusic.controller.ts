import { Response, Request } from "express";
import { getAllMusicService } from "../../../services/artist/music/getAllMusic.service";
import { getIdMusicService } from "../../../services/artist/music/getIdMusic.service";

export const getIdMusicController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.user;
  const {idMusic} = req.params
  const music = await getIdMusicService(idMusic, id);
  
  return res.status(200).json(music);
};
