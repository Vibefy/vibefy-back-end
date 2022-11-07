import DeleteMusicService from "../../services/aws/deleteFile.service";
import { Request, Response } from "express";
export const deleteFileController = async (req: Request, res: Response) => {
  const { filePast, fileNameMusic, fileNameImage } = req.body;

  await DeleteMusicService(filePast!, fileNameMusic!, fileNameImage!);

  return res.send();
};
