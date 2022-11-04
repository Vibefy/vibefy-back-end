import S3Storage from "../../utils/s3Storage";
import crypto from "crypto";

const UploadMuisicService = async (file: any): Promise<void> => {
  const s3 = new S3Storage();
  const fileHash = crypto.randomBytes(8).toString("hex");
  const filepast = `${fileHash}-${file.music[0].filename.split(".")[0]}`;

  await s3.saveFile(file.music[0].filename, filepast);
  await s3.saveFile(file.image[0].filename, filepast);
};

export default UploadMuisicService;
