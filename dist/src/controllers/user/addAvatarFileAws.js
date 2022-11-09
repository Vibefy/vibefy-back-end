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
exports.addAvatarFile = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3Storage_1 = require("../../utils/s3Storage");
const data_source_1 = require("../../data-source");
const user_entity_1 = __importDefault(require("../../entities/user.entity"));
const appError_1 = require("../../error/appError");
const s3Url_1 = require("../../utils/s3Url");
const addAvatarFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    let saveAvatarImage;
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.default);
    const user = yield userRepository.findOneBy({ id });
    if (!user) {
        throw new appError_1.AppError(404, "User is not found");
    }
    const userName = user.name;
    const upload = (0, multer_1.default)({
        storage: (0, multer_s3_1.default)({
            bucket: "vibefy",
            s3: s3Storage_1.ConnectAws,
            key: ((req, file, cb) => __awaiter(void 0, void 0, void 0, function* () {
                if (file.fieldname === "avatar") {
                    if (file.mimetype === "image/jpg") {
                        cb(null, `avatar/user/${userName}.jpg`);
                        saveAvatarImage = `${userName}.jpg`;
                    }
                    else if (file.mimetype === "image/jpeg") {
                        cb(null, `avatar/user/${userName}.jpeg`);
                        saveAvatarImage = `${userName}.jpeg`;
                    }
                    else if (file.mimetype === "image/png") {
                        cb(null, `avatar/user/${userName}.png`);
                        saveAvatarImage = `${userName}.png`;
                    }
                    else {
                        return res.status(400).end("Avatar only in png,jpg or jpeg format");
                    }
                }
                else {
                    return res.status(400).end("avatar field is required");
                }
            }))
        })
    });
    const avatarUpload = upload.single("avatar");
    return avatarUpload(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const imageField = req.file;
            if (imageField.mimetype !== "image/png" && imageField.mimetype !== "image/jpg" && imageField.mimetype !== "image/jpeg") {
                return res.status(400).end("Avatar only in png,jpg or jpeg format");
            }
            const avatarUrl = (0, s3Url_1.s3AvatarUserUrl)(saveAvatarImage);
            user.avatar_img = avatarUrl;
            yield userRepository.save(user);
            return res.status(200).json({ avatar_img: avatarUrl });
        }
        catch (err) {
            return res.status(400).end("avatar is required file");
        }
    }));
});
exports.addAvatarFile = addAvatarFile;
