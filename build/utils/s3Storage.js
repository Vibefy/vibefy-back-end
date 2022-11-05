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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const upload_1 = __importDefault(require("../config/upload"));
class S3Storage {
    constructor() {
        this.client = new aws_sdk_1.default.S3({
            region: "sa-east-1",
        });
    }
    saveFile(filename, pastName) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalPath = path_1.default.resolve(upload_1.default.directory, filename);
            const ContentType = mime_1.default.getType(originalPath);
            if (!ContentType) {
                throw new Error("File not found");
            }
            const fileContent = yield fs_1.default.promises.readFile(originalPath);
            this.client
                .putObject({
                Bucket: "testsmusics",
                Key: `${pastName}/${filename}`,
                ACL: "public-read",
                Body: fileContent,
                ContentType,
            })
                .promise();
            yield fs_1.default.promises.unlink(originalPath);
        });
    }
    deleteFile(filePast, fileNameMusic, fileNameImage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .deleteObjects({
                Bucket: "testsmusics",
                Delete: {
                    Objects: [
                        { Key: `${filePast}${fileNameMusic}` },
                        { Key: `${filePast}${fileNameImage}` },
                        { Key: filePast },
                    ],
                },
            })
                .promise();
        });
    }
}
exports.default = S3Storage;
