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
exports.deleteArtistByIdService = void 0;
const appError_1 = require("../../error/appError");
const data_source_1 = require("../../data-source");
const artist_entity_1 = __importDefault(require("../../entities/artist.entity"));
const deleteArtistByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const artRepository = data_source_1.AppDataSource.getRepository(artist_entity_1.default);
    const arts = yield artRepository.findOneBy({ id });
    arts.isActive;
    if (arts) {
        if (arts.isActive === false) {
            throw new appError_1.AppError(400, "Artist has already been deleted or does not exist");
        }
        artRepository.update(arts.id, {
            isActive: false,
        });
        return true;
    }
    throw new appError_1.AppError(404, "Artist not exist");
});
exports.deleteArtistByIdService = deleteArtistByIdService;
