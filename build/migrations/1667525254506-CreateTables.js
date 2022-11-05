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
exports.CreateTables1667525254506 = void 0;
class CreateTables1667525254506 {
    constructor() {
        this.name = 'CreateTables1667525254506';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.572Z"'`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_At"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.572Z"'`);
            yield queryRunner.query(`ALTER TABLE "playlists_users" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "playlists_users" ADD "created_At" TIMESTAMP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.573Z"'`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "updated_At"`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.573Z"'`);
            yield queryRunner.query(`ALTER TABLE "playlists_musics" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "playlists_musics" ADD "created_At" TIMESTAMP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "music" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "music" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.573Z"'`);
            yield queryRunner.query(`ALTER TABLE "music" DROP COLUMN "updated_At"`);
            yield queryRunner.query(`ALTER TABLE "music" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.573Z"'`);
            yield queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "artist" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.574Z"'`);
            yield queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "updated_At"`);
            yield queryRunner.query(`ALTER TABLE "artist" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.574Z"'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "updated_At"`);
            yield queryRunner.query(`ALTER TABLE "artist" ADD "updated_At" date NOT NULL DEFAULT '2022-11-04'`);
            yield queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "artist" ADD "created_At" date NOT NULL DEFAULT '2022-11-04'`);
            yield queryRunner.query(`ALTER TABLE "music" DROP COLUMN "updated_At"`);
            yield queryRunner.query(`ALTER TABLE "music" ADD "updated_At" date NOT NULL DEFAULT '2022-11-04'`);
            yield queryRunner.query(`ALTER TABLE "music" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "music" ADD "created_At" date NOT NULL DEFAULT '2022-11-04'`);
            yield queryRunner.query(`ALTER TABLE "playlists_musics" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "playlists_musics" ADD "created_At" date NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "updated_At"`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "updated_At" date NOT NULL DEFAULT '2022-11-04'`);
            yield queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "playlist" ADD "created_At" date NOT NULL DEFAULT '2022-11-04'`);
            yield queryRunner.query(`ALTER TABLE "playlists_users" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "playlists_users" ADD "created_At" date NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_At"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "updated_At" date NOT NULL DEFAULT '2022-11-04'`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_At"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "created_At" date NOT NULL DEFAULT '2022-11-04'`);
        });
    }
}
exports.CreateTables1667525254506 = CreateTables1667525254506;
