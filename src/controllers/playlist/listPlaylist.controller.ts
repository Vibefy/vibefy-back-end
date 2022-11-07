import { Response, Request } from "express";
import { listPlaylistService } from "../../services/playlist/listPlaylist.service";

export const listPlaylistController = async (req: Request, res: Response) => {
  const allPlaylist = await listPlaylistService();

  res.json(allPlaylist);
};
