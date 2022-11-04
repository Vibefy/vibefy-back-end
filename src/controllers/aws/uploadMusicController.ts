import UploadMuisicService from "../../services/aws/postFile.service";
import { Request, Response } from "express";
export const uploadMusicController = async (
  request: Request,
  response: Response
) => {
  const { files } = request;

  const uploadMusicService = await UploadMuisicService(files!);

  return response.json({ success: true });
};
