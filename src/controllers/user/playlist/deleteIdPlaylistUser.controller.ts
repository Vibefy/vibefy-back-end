import { Response, Request } from "express";
import { deleteIdPlaylistUserService } from "../../../services/user/playlist/deletePlaylistUser.service";

export const deleteIdPlaylistUsersController = async (
  req: Request,
  res: Response
) => {
  const { id_playlist } = req.params;
  const { id } = req.user;

  await deleteIdPlaylistUserService(id, id_playlist);

  return res.status(204).send()
};
