import { MigrationInterface, QueryRunner } from "typeorm";

export class AddrelationPayment1667334769033 implements MigrationInterface {
    name = 'AddrelationPayment1667334769033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:32:56.053Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:32:56.053Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:32:56.054Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:32:56.054Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:32:56.054Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:32:56.054Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:32:56.055Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:32:56.055Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '2022-11-01'`);
    }

}
