import { Response, Request } from "express";
import { deletePlaylistService } from "../../services/playlist/deletePlaylist.service";

export const deletePlaylistController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deletePlaylistService(id);

  res.status(204).send();
};
