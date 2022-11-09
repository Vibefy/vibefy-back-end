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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMusicArtistController = void 0;
const getAllMusic_service_1 = require("../../../services/artist/music/getAllMusic.service");
const getAllMusicArtistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const music = yield (0, getAllMusic_service_1.getAllMusicService)(id);
    return res.status(200).json(music);
});
exports.getAllMusicArtistController = getAllMusicArtistController;
