import { Response, Request } from "express";
import { getIdPlaylistUserService } from "../../../services/user/playlist/getIdPlaylistUser.service";

export const getIdPlaylistUsersController = async (req: Request, res: Response) => {
  const { id_playlist } = req.params;
  const {id} = req.user
  const user = await getIdPlaylistUserService(id, id_playlist);
  return res.status(201).json(user);
};
