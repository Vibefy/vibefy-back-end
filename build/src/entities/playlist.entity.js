"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const playlists_musics_entity_1 = __importDefault(require("./playlists_musics.entity"));
const playlists_users_entity_1 = __importDefault(require("./playlists_users.entity"));
let Playlist = class Playlist {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Playlist.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Playlist.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Playlist.prototype, "link_playlist", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => playlists_musics_entity_1.default, (playlists_musics) => playlists_musics.music),
    __metadata("design:type", Array)
], Playlist.prototype, "music", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => playlists_users_entity_1.default, (PlaylistsUsers) => PlaylistsUsers.user),
    __metadata("design:type", Array)
], Playlist.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { default: new Date() }),
    __metadata("design:type", Date)
], Playlist.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { default: new Date() }),
    __metadata("design:type", Date)
], Playlist.prototype, "updated_At", void 0);
Playlist = __decorate([
    (0, typeorm_1.Entity)("playlist")
], Playlist);
exports.default = Playlist;
