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
exports.getAllArtistsController = void 0;
const getAllArtists_service_1 = require("../../services/adm/getAllArtists.service");
const getAllArtistsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const artist = yield (0, getAllArtists_service_1.getAllArtistsService)();
    return res.status(200).json(artist);
});
exports.getAllArtistsController = getAllArtistsController;
