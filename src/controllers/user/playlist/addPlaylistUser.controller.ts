import { Response, Request } from "express";
import { addPlaylistUserService } from "../../../services/user/playlist/AddPlaylist.service";

export const addPlaylistUserController = async (
  req: Request,
  res: Response
) => {
  const { id_playlist } = req.params;

  const { id } = req.user;

  await addPlaylistUserService(id, id_playlist);

  return res.status(200).json({ message: "Successfully added" });
};
