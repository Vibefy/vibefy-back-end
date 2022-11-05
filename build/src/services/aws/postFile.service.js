"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s3Storage_1 = __importDefault(require("../../utils/s3Storage"));
const crypto_1 = __importDefault(require("crypto"));
const UploadMuisicService = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new s3Storage_1.default();
    const fileHash = crypto_1.default.randomBytes(8).toString("hex");
    const filepast = `${fileHash}-${file.music[0].filename.split(".")[0]}`;
    yield s3.saveFile(file.music[0].filename, filepast);
    yield s3.saveFile(file.image[0].filename, filepast);
});
exports.default = UploadMuisicService;
