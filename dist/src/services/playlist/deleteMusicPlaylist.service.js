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
exports.deleteMusicPlaylistService = void 0;
const music_entity_1 = __importDefault(require("../../entities/music.entity"));
const appError_1 = require("../../error/appError");
const data_source_1 = require("../../data-source");
const playlist_entity_1 = __importDefault(require("../../entities/playlist.entity"));
const deleteMusicPlaylistService = (id, id_music) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteRepository = data_source_1.AppDataSource.getRepository(playlist_entity_1.default);
    const musicRepository = data_source_1.AppDataSource.getRepository(music_entity_1.default);
    const playlist = yield deleteRepository.findOneBy({ id });
    if (!playlist) {
        throw new appError_1.AppError(404, "Playlist not found");
    }
    const music = yield musicRepository.findOneBy({ id: id_music });
    if (!music) {
        throw new appError_1.AppError(404, "Music not found");
    }
    const filteredMusics = playlist.music.filter((elem) => elem.id !== id_music);
    playlist.music = filteredMusics;
    yield deleteRepository.save(playlist);
    return true;
});
exports.deleteMusicPlaylistService = deleteMusicPlaylistService;
