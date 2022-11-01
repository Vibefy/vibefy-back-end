import { MigrationInterface, QueryRunner } from "typeorm";

export class AddrelationPayment1667335069374 implements MigrationInterface {
    name = 'AddrelationPayment1667335069374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adm" RENAME COLUMN "avatar_image" TO "avatar_img"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "avatar_image" TO "avatar_img"`);
        await queryRunner.query(`ALTER TABLE "artist" RENAME COLUMN "avatar_image" TO "avatar_img"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:37:55.021Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:37:55.021Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:37:55.022Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:37:55.022Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:37:55.022Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:37:55.022Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:37:55.023Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:37:55.023Z"'`);
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
        await queryRunner.query(`ALTER TABLE "artist" RENAME COLUMN "avatar_img" TO "avatar_image"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "avatar_img" TO "avatar_image"`);
        await queryRunner.query(`ALTER TABLE "adm" RENAME COLUMN "avatar_img" TO "avatar_image"`);
    }

}
