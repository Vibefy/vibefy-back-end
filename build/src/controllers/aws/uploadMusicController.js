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
exports.uploadMusicController = void 0;
const postFile_service_1 = __importDefault(require("../../services/aws/postFile.service"));
const uploadMusicController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = request;
    const uploadMusicService = yield (0, postFile_service_1.default)(files);
    return response.json({ success: true });
});
exports.uploadMusicController = uploadMusicController;
