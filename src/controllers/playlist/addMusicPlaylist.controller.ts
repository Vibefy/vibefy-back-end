import { Response, Request } from "express";
import { addMusicPlaylistService } from "../../services/playlist/addMusic.service";

export const addMusicPlaylistController = async (
  req: Request,
  res: Response
) => {
  const { id, id_music } = req.params;

  console.log(id,id_music)
  
  const addMusic = await addMusicPlaylistService(id, id_music);

  return res.status(200).json(addMusic);
};
