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
exports.deleteMusicPlaylistController = void 0;
const deleteMusicPlaylist_service_1 = require("../../services/playlist/deleteMusicPlaylist.service");
const deleteMusicPlaylistController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_music } = req.params;
    yield (0, deleteMusicPlaylist_service_1.deleteMusicPlaylistService)(id, id_music);
    res.status(204).send();
});
exports.deleteMusicPlaylistController = deleteMusicPlaylistController;
