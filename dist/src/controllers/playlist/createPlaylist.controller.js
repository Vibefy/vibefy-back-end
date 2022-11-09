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
exports.createPlaylistController = void 0;
const createPlaylist_service_1 = require("../../services/playlist/createPlaylist.service");
const createPlaylistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlistName = req.body.name;
    const playlistCreated = yield (0, createPlaylist_service_1.createPlaylistService)(playlistName);
    return res.status(200).json(playlistCreated);
});
exports.createPlaylistController = createPlaylistController;
