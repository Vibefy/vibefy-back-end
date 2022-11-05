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
exports.CreateTables1667528872673 = void 0;
class CreateTables1667528872673 {
    constructor() {
        this.name = 'CreateTables1667528872673';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T02:27:58.045Z"'`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T02:27:58.045Z"'`);
            yield queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T02:27:58.045Z"'`);
            yield queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T02:27:58.045Z"'`);
            yield queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T02:27:58.046Z"'`);
            yield queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T02:27:58.046Z"'`);
            yield queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isActive"`);
            yield queryRunner.query(`ALTER TABLE "artist" ADD "isActive" boolean NOT NULL DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T02:27:58.046Z"'`);
            yield queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T02:27:58.046Z"'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 01:27:40.574'`);
            yield queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 01:27:40.574'`);
            yield queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isActive"`);
            yield queryRunner.query(`ALTER TABLE "artist" ADD "isActive" character varying NOT NULL DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 01:27:40.573'`);
            yield queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 01:27:40.573'`);
            yield queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 01:27:40.573'`);
            yield queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 01:27:40.573'`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 01:27:40.572'`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 01:27:40.572'`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "isActive" character varying NOT NULL DEFAULT true`);
        });
    }
}
exports.CreateTables1667528872673 = CreateTables1667528872673;
