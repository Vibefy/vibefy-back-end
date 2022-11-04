import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1667528872673 implements MigrationInterface {
    name = 'CreateTables1667528872673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T02:27:58.045Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T02:27:58.045Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T02:27:58.045Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T02:27:58.045Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T02:27:58.046Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T02:27:58.046Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T02:27:58.046Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T02:27:58.046Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 01:27:40.574'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 01:27:40.574'`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "isActive" character varying NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 01:27:40.573'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 01:27:40.573'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 01:27:40.573'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 01:27:40.573'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 01:27:40.572'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 01:27:40.572'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" character varying NOT NULL DEFAULT true`);
    }

}
