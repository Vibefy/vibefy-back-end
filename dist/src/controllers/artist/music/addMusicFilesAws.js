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
exports.addMusicFilesAws = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const music_entity_1 = __importDefault(require("../../../entities/music.entity"));
const appError_1 = require("../../../error/appError");
const data_source_1 = require("../../../data-source");
const s3Storage_1 = require("../../../utils/s3Storage");
const s3Url_1 = require("../../../utils/s3Url");
const addMusicFilesAws = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let saveNameMusic;
        let saveNameImage;
        const musicRepository = data_source_1.AppDataSource.getRepository(music_entity_1.default);
        const IsFindMusic = yield musicRepository.findOneBy({ id });
        if (!IsFindMusic) {
            throw new appError_1.AppError(404, "Music not found");
        }
        const musicName = IsFindMusic.name;
        const upload = (0, multer_1.default)({
            storage: (0, multer_s3_1.default)({
                bucket: "vibefy",
                s3: s3Storage_1.ConnectAws,
                key: (req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        if (file.fieldname === "music") {
                            if (file.mimetype !== "audio/mpeg") {
                                throw new appError_1.AppError(400, "music only in mp3 format");
                            }
                            saveNameMusic = `${id}/${musicName}.mp3`;
                            cb(null, `musics/${id}/${musicName}.mp3`);
                        }
                        else {
                            if (file.fieldname === "image") {
                                if (file.mimetype !== "image/jpg" &&
                                    file.mimetype !== "image/jpeg" &&
                                    file.mimetype !== "image/png") {
                                    throw new appError_1.AppError(400, "image can only be a png, jpg or jpeg");
                                }
                                if (file.mimetype === "image/jpg") {
                                    saveNameImage = `${id}/${musicName}.jpg`;
                                    cb(null, `musics/${id}/${musicName}.jpg`);
                                }
                                else if (file.mimetype === "image/jpeg") {
                                    saveNameImage = `${id}/${musicName}.jpeg`;
                                    cb(null, `musics/${id}/${musicName}.jpeg`);
                                }
                                else if (file.mimetype === "image/png") {
                                    saveNameImage = `${id}/${musicName}.png`;
                                    cb(null, `musics/${id}/${musicName}.png`);
                                }
                            }
                        }
                    }
                    catch (err) {
                        if (err instanceof appError_1.AppError) {
                            return res.status(err.statusCode).send(err.message);
                        }
                        return res.status(500).send({ message: "Error" });
                    }
                }),
            }),
        });
        const music = upload.fields([
            { name: "image", maxCount: 1 },
            { name: "music", maxCount: 1 },
        ]);
        return music(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!saveNameMusic || !saveNameImage) {
                    throw new appError_1.AppError(400, "music and image are required files");
                }
                else {
                    IsFindMusic.music_url = (0, s3Url_1.s3MusicUrl)(saveNameMusic);
                    IsFindMusic.image_url = (0, s3Url_1.s3ImageUrl)(saveNameImage);
                    yield musicRepository.save(IsFindMusic);
                    return res.status(200).json(IsFindMusic);
                }
            }
            catch (err) {
                if (err instanceof appError_1.AppError) {
                    return res.status(err.statusCode).send({ message: err.message });
                }
                return res.status(500).send("Error");
            }
        }));
    }
    catch (err) {
        if (err instanceof appError_1.AppError) {
            return res.status(err.statusCode).send({ message: err.message });
        }
        return res.status(400).send({ message: err.message });
    }
});
exports.addMusicFilesAws = addMusicFilesAws;
