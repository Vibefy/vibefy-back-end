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
const payment_user_entity_1 = __importDefault(require("./payment_user.entity"));
const playlists_users_entity_1 = __importDefault(require("./playlists_users.entity"));
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { default: "https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg" }),
    __metadata("design:type", String)
], User.prototype, "avatar_img", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_user_entity_1.default, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", payment_user_entity_1.default)
], User.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => playlists_users_entity_1.default, (PlaylistsUsers) => PlaylistsUsers.playlist),
    __metadata("design:type", Array)
], User.prototype, "playlist", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "created_At", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { default: new Date() }),
    __metadata("design:type", Date)
], User.prototype, "updated_At", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
exports.default = User;
