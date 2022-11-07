import crypto from "crypto";
import S3Storage from "../../utils/s3Storage";
import { fileNameWithOutExtension } from "../../config/upload";

const UploadMuisicService = async (file: any): Promise<void> => {
  const s3 = new S3Storage();
  const fileHash = crypto.randomBytes(8).toString("hex");
  const fileNameValid = fileNameWithOutExtension(file.music[0].filename)
  const filepast = `${fileHash}-${fileNameValid}`;

  await s3.saveFile(file.music[0].filename, filepast);
  await s3.saveFile(file.image[0].filename, filepast);
};

export default UploadMuisicService;

