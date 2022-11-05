"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const tmpFolder = path_1.default.resolve(__dirname, "..", "..", "tmp");
exports.default = {
    directory: tmpFolder,
    storage: multer_1.default.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileNameCorrect = file.originalname.replace(/[^a-zA-Z0-9 ]/g, "");
            if (fileNameCorrect.includes("mp3")) {
                return callback(null, fileNameCorrect.replace("mp3", "") + ".mp3");
            }
            else if (fileNameCorrect.includes("png")) {
                return callback(null, fileNameCorrect.replace("png", "") + ".png");
            }
            else if (fileNameCorrect.includes("jpg")) {
                return callback(null, fileNameCorrect.replace("jpg", "") + ".jpg");
            }
            else {
                return callback(null, fileNameCorrect.replace("jpge", "") + ".jpge");
            }
        },
    }),
};
