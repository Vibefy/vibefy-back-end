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
exports.getIdPlaylistUsersController = void 0;
const getIdPlaylistUser_service_1 = require("../../../services/user/playlist/getIdPlaylistUser.service");
const getIdPlaylistUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_playlist } = req.params;
    const { id } = req.user;
    const playlistUser = yield (0, getIdPlaylistUser_service_1.getIdPlaylistUserService)(id, id_playlist);
    return res.status(200).json(playlistUser);
});
exports.getIdPlaylistUsersController = getIdPlaylistUsersController;
