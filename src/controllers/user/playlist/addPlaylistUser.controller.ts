import { Response, Request } from "express";
import { addPlaylistUserService } from "../../../services/user/playlist/AddPlaylist.service";


export const addPlaylistUserController = async (req: Request, res: Response) => {
  const { id_playlist } = req.body;
  const {id} = req.user
  const user = await addPlaylistUserService(id, id_playlist);
  return res.status(201).json(user);
};
