import { Response, Request } from "express";
import { addMusicPlaylistService } from "../../services/playlist/addMusic.service";

export const addMusicPlaylistController = async (
  req: Request,
  res: Response
) => {
  const { id, id_music } = req.params;
  const addMusic = await addMusicPlaylistService(id, id_music);

  res.json(addMusic);
};
