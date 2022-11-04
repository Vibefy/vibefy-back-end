import S3Storage from "../../utils/s3Storage";

const DeleteMusicService = async (
  filePast: string,
  fileNameMusic: string,
  fileNameImage: string
): Promise<void> => {
  const s3 = new S3Storage();

  const oi = await s3.deleteFile(filePast, fileNameMusic, fileNameImage);

  return oi;
};

export default DeleteMusicService;
