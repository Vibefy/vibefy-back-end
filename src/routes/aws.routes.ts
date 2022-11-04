import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { deleteFileController } from "../controllers/awsController/deleteFileController";
import { uploadMusicController } from "../controllers/awsController/uploadMusicController";

const routes = Router();
const upload = multer(uploadConfig);

routes.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "music", maxCount: 1 },
  ]),
  uploadMusicController
);

routes.delete("/", deleteFileController);

export default routes;
