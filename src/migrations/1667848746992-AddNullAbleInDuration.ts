import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullAbleInDuration1667848746992 implements MigrationInterface {
    name = 'AddNullAbleInDuration1667848746992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "duration" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "music" ALTER COLUMN "duration" SET NOT NULL`);
    }

}
