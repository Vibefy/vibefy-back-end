import { MigrationInterface, QueryRunner } from "typeorm";

export class AddURLMusicAndImageOfMusic1667846330005 implements MigrationInterface {
    name = 'AddURLMusicAndImageOfMusic1667846330005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "music" ADD "music_url" character varying`);
        await queryRunner.query(`ALTER TABLE "music" ADD "image_url" character varying`);
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "image_url"`);
        await queryRunner.query(`ALTER TABLE "music" DROP COLUMN "music_url"`);
    }

}
