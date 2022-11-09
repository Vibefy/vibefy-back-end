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
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const artist_entity_1 = __importDefault(require("./artist.entity"));
const playlist_entity_1 = __importDefault(require("./playlist.entity"));
let Music = class Music {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Music.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Music.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Music.prototype, "artistName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Music.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], Music.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { nullable: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Number)
], Music.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], Music.prototype, "music_url", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", String)
], Music.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => artist_entity_1.default, (artist) => artist.music),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", artist_entity_1.default)
], Music.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => playlist_entity_1.default),
    __metadata("design:type", Array)
], Music.prototype, "playlist", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    __metadata("design:type", Date)
], Music.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    __metadata("design:type", Date)
], Music.prototype, "updated_At", void 0);
Music = __decorate([
    (0, typeorm_1.Entity)("music")
], Music);
exports.default = Music;
