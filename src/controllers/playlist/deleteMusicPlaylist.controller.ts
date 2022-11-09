import { Response, Request } from "express";
import { deleteMusicPlaylistService } from "../../services/playlist/deleteMusicPlaylist.service";

export const deleteMusicPlaylistController = async (
  req: Request,
  res: Response
) => {
  const { id, id_music } = req.params;

  await deleteMusicPlaylistService(id, id_music);

  res.status(204).send();
};
