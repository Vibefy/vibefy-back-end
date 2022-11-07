import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumnURLPlaylist1667834295364 implements MigrationInterface {
    name = 'RemoveColumnURLPlaylist1667834295364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "link_playlist"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "created_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "updated_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "music" ADD "created_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "music" ADD "updated_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "created_At" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "updated_At" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '2022-11-04 18:31:14.52'`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '2022-11-04 18:31:14.52'`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "music" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '2022-11-04 18:31:14.52'`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "music" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '2022-11-04 18:31:14.52'`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '2022-11-04 18:31:14.519'`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '2022-11-04 18:31:14.519'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_At"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_At" TIMESTAMP NOT NULL DEFAULT '2022-11-04 18:31:14.519'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_At"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_At" TIMESTAMP NOT NULL DEFAULT '2022-11-04 18:31:14.519'`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD "link_playlist" character varying NOT NULL`);
    }

}
