import { MigrationInterface, QueryRunner } from "typeorm";

export class AddrelationPayment1667334874161 implements MigrationInterface {
    name = 'AddrelationPayment1667334874161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "paymentId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e0bd6fdbf43b798bda889642dcb" UNIQUE ("paymentId")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:34:40.294Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:34:40.294Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:34:40.294Z"'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:34:40.294Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:34:40.295Z"'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:34:40.295Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '"2022-11-01T20:34:40.296Z"'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '"2022-11-01T20:34:40.296Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e0bd6fdbf43b798bda889642dcb" FOREIGN KEY ("paymentId") REFERENCES "payment_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e0bd6fdbf43b798bda889642dcb"`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "created_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "playlist" ALTER COLUMN "created_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_At" SET DEFAULT '2022-11-01'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e0bd6fdbf43b798bda889642dcb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "paymentId"`);
    }

}
