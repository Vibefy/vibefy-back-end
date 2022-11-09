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
exports.createMusicService = void 0;
const class_transformer_1 = require("class-transformer");
const appError_1 = require("../../../error/appError");
const music_entity_1 = __importDefault(require("../../../entities/music.entity"));
const artist_entity_1 = __importDefault(require("../../../entities/artist.entity"));
const data_source_1 = require("../../../data-source");
const createMusicService = ({ name, id, genre, description, duration, }) => __awaiter(void 0, void 0, void 0, function* () {
    const musicRepository = data_source_1.AppDataSource.getRepository(music_entity_1.default);
    const musicAlreadyExists = yield musicRepository.findOneBy({
        name,
    });
    const artistRepository = data_source_1.AppDataSource.getRepository(artist_entity_1.default);
    const artists = yield artistRepository.findOneBy({
        id,
    });
    if (!artists) {
        throw new appError_1.AppError(400, "Artist not found");
    }
    if (musicAlreadyExists) {
        throw new appError_1.AppError(400, "Music already exists");
    }
    const date = new Date();
    const music = new music_entity_1.default();
    music.artist = artists;
    music.name = name;
    music.artistName = artists.name;
    music.description = description ? description : null;
    music.duration = duration ? Number(duration) : null;
    music.genre = genre;
    music.created_At = date;
    music.updated_At = date;
    yield musicRepository.save(music);
    musicRepository.create(music);
    return (0, class_transformer_1.classToPlain)(music);
});
exports.createMusicService = createMusicService;
