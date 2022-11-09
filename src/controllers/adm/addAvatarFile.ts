import multer from "multer";
import multerS3 from "multer-s3";
import Adm from "../../entities/adm.entity";
import { Response, Request } from "express";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import { ConnectAws } from "../../utils/s3Storage";
import { s3AvatarAdmUrl } from "../../utils/s3Url";

export const addAvatarFile = async (req: Request, res: Response) => {
  const id = req.user.id;

  let saveAvatarImage: string;

  const admRepository = AppDataSource.getRepository(Adm);

  const adm = await admRepository.findOneBy({ id });

  if (!adm) {
    throw new AppError(404, "Adm is not found");
  }
  const admName = adm.name;

  const upload = multer({
    storage: multerS3({
      bucket: "vibefy",
      s3: ConnectAws,
      key: async (req: Request, file, cb) => {
        if (file.fieldname === "avatar") {
          if (file.mimetype === "image/jpg") {
            cb(null, `avatar/adm/${admName}.jpg`);
            saveAvatarImage = `${admName}.jpg`;
          }
          if (file.mimetype === "image/jpeg") {
            cb(null, `avatar/adm/${admName}.jpeg`);
            saveAvatarImage = `${admName}.jpeg`;
          }
          if (file.mimetype === "image/png") {
            cb(null, `avatar/adm/${admName}.png`);
            saveAvatarImage = `${admName}.png`;
          }
        }
      },
    }),
  });
  const avatarUpload = upload.single("avatar");

  return avatarUpload(req, res, async () => {
    try {
      const imageField = req.file;
      if (
        imageField.mimetype !== "image/png" &&
        imageField.mimetype !== "image/jpg" &&
        imageField.mimetype !== "image/jpeg"
      ) {
        return res
          .status(400)
          .json({ message: "Avatar only in png,jpg or jpeg format" });
      }

      const avatarUrl = s3AvatarAdmUrl(saveAvatarImage);

      adm.avatar_img = avatarUrl;

      await admRepository.save(adm);

      return res.status(200).json({ avatar_img: avatarUrl });
    } catch (err) {
      return res.status(400).json({ message: "Avatar is required file" });
    }
  });
};
