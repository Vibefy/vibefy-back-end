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
exports.getAllArtistsService = void 0;
const class_transformer_1 = require("class-transformer");
const data_source_1 = require("../../data-source");
const artist_entity_1 = __importDefault(require("../../entities/artist.entity"));
const getAllArtistsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(artist_entity_1.default);
    const artist = yield userRepository.find({ relations: { music: true } });
    const artistNoPassword = (0, class_transformer_1.classToPlain)(artist);
    return artistNoPassword;
});
exports.getAllArtistsService = getAllArtistsService;
