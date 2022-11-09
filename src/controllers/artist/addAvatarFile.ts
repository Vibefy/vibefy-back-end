import multer from "multer";
import multerS3 from "multer-s3";
import { Response, Request } from "express";
import { AppError } from "../../error/appError";
import { AppDataSource } from "../../data-source";
import Artist from "../../entities/artist.entity";
import { ConnectAws } from "../../utils/s3Storage";
import { s3AvatarArtistUrl } from "../../utils/s3Url";

export const addAvatarFile = async (req: Request, res: Response) => {
  const id = req.user.id;

  let saveAvatarImage: string;

  const artistRepository = AppDataSource.getRepository(Artist);

  const artist = await artistRepository.findOneBy({ id });

  if (!artist) {
    throw new AppError(404, "Artist is not found");
  }
  const artistName = artist.name;

  const upload = multer({
    storage: multerS3({
      bucket: "vibefy",
      s3: ConnectAws,
      key: async (req: Request, file, cb) => {
        if (file.fieldname === "avatar") {
          if (file.mimetype === "image/jpg") {
            cb(null, `avatar/artist/${artistName}.jpg`);
            saveAvatarImage = `${artistName}.jpg`;
          }
          if (file.mimetype === "image/jpeg") {
            cb(null, `avatar/artist/${artistName}.jpeg`);
            saveAvatarImage = `${artistName}.jpeg`;
          }
          if (file.mimetype === "image/png") {
            cb(null, `avatar/artist/${artistName}.png`);
            saveAvatarImage = `${artistName}.png`;
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
          .json({ message: "Avatar only in png, jpg or jpeg format" });
      }

      const avatarUrl = s3AvatarArtistUrl(saveAvatarImage);

      artist.avatar_img = avatarUrl;

      await artistRepository.save(artist);

      return res.status(200).json({ avatar_img: avatarUrl });
    } catch (err) {
      return res.status(400).json({ message: "Avatar is required file" });
    }
  });
};
