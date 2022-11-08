import { Response, Request } from "express";
import { createPlaylistService } from "../../services/playlist/createPlaylist.service";

export const createPlaylistController = async (req: Request, res: Response) => {
  const playlistName = req.body.name;

  const playlistCreated = await createPlaylistService(playlistName);
  
  return res.status(200).json(playlistCreated);
};
