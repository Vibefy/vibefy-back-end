import DeleteMusicService from "../../services/awsServices/deleteFile.service";
import { Request, Response } from "express";
export const deleteFileController = async (
  request: Request,
  response: Response
) => {
  const { filePast, fileNameMusic, fileNameImage } = request.body;

  await DeleteMusicService(filePast!, fileNameMusic!, fileNameImage!);

  return response.send();
};
