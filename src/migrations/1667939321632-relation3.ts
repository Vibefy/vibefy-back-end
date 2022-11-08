import { MigrationInterface, QueryRunner } from "typeorm";

export class relation31667939321632 implements MigrationInterface {
    name = 'relation31667939321632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_img" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, CONSTRAINT "UQ_0f5ee0a519c677c5237a33b9516" UNIQUE ("email"), CONSTRAINT "PK_d4dab02cf2667fc5b673741b322" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_At" date NOT NULL, "updated_At" date NOT NULL, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "music" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistName" character varying NOT NULL, "genre" character varying NOT NULL, "description" character varying, "duration" double precision, "music_url" character varying, "image_url" character varying, "created_At" date NOT NULL, "updated_At" date NOT NULL, "artistId" uuid, CONSTRAINT "PK_c92b010dd889692dd54286f75e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_img" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "created_At" date NOT NULL, "updated_At" date NOT NULL, CONSTRAINT "UQ_66b179caee88b4a3f0bb46533d4" UNIQUE ("email"), CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "card_number" numeric(16) NOT NULL, "due_date" date NOT NULL, "card_cv" numeric(16) NOT NULL, CONSTRAINT "PK_c66c60a17b56ec882fcd8ec770b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_img" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "created_At" date NOT NULL, "updated_At" date NOT NULL, "paymentId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_e0bd6fdbf43b798bda889642dc" UNIQUE ("paymentId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist_music_music" ("playlistId" uuid NOT NULL, "musicId" uuid NOT NULL, CONSTRAINT "PK_511fa11ec92893845bf76f51646" PRIMARY KEY ("playlistId", "musicId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_70c5a242e99cf3e4acdf16247b" ON "playlist_music_music" ("playlistId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c41aa9ab50fe0f8444ff94f63c" ON "playlist_music_music" ("musicId") `);
        await queryRunner.query(`CREATE TABLE "user_playlist_playlist" ("userId" uuid NOT NULL, "playlistId" uuid NOT NULL, CONSTRAINT "PK_e5020332f75c5e7d0f916ce91eb" PRIMARY KEY ("userId", "playlistId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c46879ed869efce6d1eeeb95e2" ON "user_playlist_playlist" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_73b4954c1fff6df3f4457af4f3" ON "user_playlist_playlist" ("playlistId") `);
        await queryRunner.query(`ALTER TABLE "music" ADD CONSTRAINT "FK_8fdd0a21f58494eba65266a1e05" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e0bd6fdbf43b798bda889642dcb" FOREIGN KEY ("paymentId") REFERENCES "payment_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_music_music" ADD CONSTRAINT "FK_70c5a242e99cf3e4acdf16247b1" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_music_music" ADD CONSTRAINT "FK_c41aa9ab50fe0f8444ff94f63cb" FOREIGN KEY ("musicId") REFERENCES "music"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_playlist_playlist" ADD CONSTRAINT "FK_c46879ed869efce6d1eeeb95e2e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_playlist_playlist" ADD CONSTRAINT "FK_73b4954c1fff6df3f4457af4f3a" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_playlist_playlist" DROP CONSTRAINT "FK_73b4954c1fff6df3f4457af4f3a"`);
        await queryRunner.query(`ALTER TABLE "user_playlist_playlist" DROP CONSTRAINT "FK_c46879ed869efce6d1eeeb95e2e"`);
        await queryRunner.query(`ALTER TABLE "playlist_music_music" DROP CONSTRAINT "FK_c41aa9ab50fe0f8444ff94f63cb"`);
        await queryRunner.query(`ALTER TABLE "playlist_music_music" DROP CONSTRAINT "FK_70c5a242e99cf3e4acdf16247b1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e0bd6fdbf43b798bda889642dcb"`);
        await queryRunner.query(`ALTER TABLE "music" DROP CONSTRAINT "FK_8fdd0a21f58494eba65266a1e05"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73b4954c1fff6df3f4457af4f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c46879ed869efce6d1eeeb95e2"`);
        await queryRunner.query(`DROP TABLE "user_playlist_playlist"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c41aa9ab50fe0f8444ff94f63c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_70c5a242e99cf3e4acdf16247b"`);
        await queryRunner.query(`DROP TABLE "playlist_music_music"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "payment_user"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "music"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "adm"`);
    }

}
