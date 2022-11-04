import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1667525254506 implements MigrationInterface {
    name = 'CreateTables1667525254506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.572Z"'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.572Z"'`);
        await queryRunner.query(`ALTER TABLE "playlists_users" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "playlists_users" ADD "created_At" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.573Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.573Z"'`);
        await queryRunner.query(`ALTER TABLE "playlists_musics" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "playlists_musics" ADD "created_At" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "music" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.573Z"'`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "music" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.573Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.574Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '"2022-11-04T01:27:40.574Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "updated_At" date NOT NULL DEFAULT '2022-11-04'`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "created_At" date NOT NULL DEFAULT '2022-11-04'`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "music" ADD "updated_At" date NOT NULL DEFAULT '2022-11-04'`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "music" ADD "created_At" date NOT NULL DEFAULT '2022-11-04'`);
        await queryRunner.query(`ALTER TABLE "playlists_musics" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "playlists_musics" ADD "created_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "updated_At" date NOT NULL DEFAULT '2022-11-04'`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "created_At" date NOT NULL DEFAULT '2022-11-04'`);
        await queryRunner.query(`ALTER TABLE "playlists_users" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "playlists_users" ADD "created_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_At" date NOT NULL DEFAULT '2022-11-04'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_At" date NOT NULL DEFAULT '2022-11-04'`);
    }

}
