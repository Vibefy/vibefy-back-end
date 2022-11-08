import { Router } from "express";

import multer from "multer";
import uploadConfig from "../config/upload";

import { deleteFileController } from "../controllers/aws/deleteFileController";
import { uploadMusicController } from "../controllers/aws/uploadMusicController";

export const awsRouter = Router();
const upload = multer(uploadConfig);

awsRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]),
  uploadMusicController
);

awsRouter.delete("/", deleteFileController);
