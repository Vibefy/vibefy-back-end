import { Response, Request } from "express";
import { listMusicsPlaylistService } from "../../services/playlist/listMusicsPlaylist.service";

export const listMusicsPlaylistController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const musics = await listMusicsPlaylistService(id);
  return res.json(musics);
};
