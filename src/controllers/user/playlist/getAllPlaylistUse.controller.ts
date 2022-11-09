import { Response, Request } from "express";
import { getAllPlaylistUserService } from "../../../services/user/playlist/getAllPlaylistUser.service";


export const getAllPlaylistUsersController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await getAllPlaylistUserService(id);
  
  return res.status(200).json(user);
};
