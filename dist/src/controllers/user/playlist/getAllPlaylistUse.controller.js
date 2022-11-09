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
exports.getAllPlaylistUsersController = void 0;
const getAllPlaylistUser_service_1 = require("../../../services/user/playlist/getAllPlaylistUser.service");
const getAllPlaylistUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const playlistUser = yield (0, getAllPlaylistUser_service_1.getAllPlaylistUserService)(id);
    return res.status(200).json(playlistUser);
});
exports.getAllPlaylistUsersController = getAllPlaylistUsersController;
