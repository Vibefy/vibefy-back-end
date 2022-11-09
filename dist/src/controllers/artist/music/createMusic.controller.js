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
exports.createMusicController = void 0;
const createMusic_service_1 = require("../../../services/artist/music/createMusic.service");
const createMusicController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, genre, description, duration } = req.body;
    const { id } = req.user;
    const music = yield (0, createMusic_service_1.createMusicService)({
        name,
        id,
        genre,
        description,
        duration,
    });
    return res.status(201).json(music);
});
exports.createMusicController = createMusicController;
