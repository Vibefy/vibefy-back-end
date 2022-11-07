import UploadMuisicService from "../../services/aws/postFile.service";
import { Request, Response } from "express";
export const uploadMusicController = async (req: Request, res: Response) => {
  const { files } = req;

  await UploadMuisicService(files!);

  return res.json({ success: true });
};
