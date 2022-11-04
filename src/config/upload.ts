import multer from "multer";
import path from "path";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileNameCorrect = file.originalname.replace(/[^a-zA-Z0-9 ]/g, "");
      if (fileNameCorrect.includes("mp3")) {
        return callback(null, fileNameCorrect.replace("mp3", "") + ".mp3");
      } else if (fileNameCorrect.includes("png")) {
        return callback(null, fileNameCorrect.replace("png", "") + ".png");
      } else if (fileNameCorrect.includes("jpg")) {
        return callback(null, fileNameCorrect.replace("jpg", "") + ".jpg");
      } else {
        return callback(null, fileNameCorrect.replace("jpge", "") + ".jpge");
      }
    },
  }),
};
