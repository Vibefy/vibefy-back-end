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
exports.createPlaylistService = void 0;
const appError_1 = require("../../error/appError");
const data_source_1 = require("../../data-source");
const playlist_entity_1 = __importDefault(require("../../entities/playlist.entity"));
const createPlaylistService = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistRepository = data_source_1.AppDataSource.getRepository(playlist_entity_1.default);
    const playlistAlreadyExist = yield playlistRepository.findOneBy({ name });
    if (playlistAlreadyExist) {
        throw new appError_1.AppError(403, "Playlist already exist");
    }
    const playlist = new playlist_entity_1.default();
    playlist.name = name;
    playlist.created_At = new Date();
    playlist.updated_At = new Date();
    playlist.music = [];
    yield playlistRepository.save(playlist);
    return playlist;
});
exports.createPlaylistService = createPlaylistService;
