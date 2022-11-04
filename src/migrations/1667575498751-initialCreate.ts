import { MigrationInterface, QueryRunner } from "typeorm";

export class initialCreate1667575498751 implements MigrationInterface {
    name = 'initialCreate1667575498751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T15:25:08.516Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T15:25:08.516Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T15:25:08.626Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T15:25:08.626Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T15:25:08.627Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T15:25:08.627Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-04T15:25:08.627Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-04T15:25:08.627Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 02:27:58.046'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 02:27:58.046'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 02:27:58.045'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 02:27:58.045'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 02:27:58.045'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 02:27:58.045'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-04 02:27:58.046'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-04 02:27:58.046'`);
    }

}
