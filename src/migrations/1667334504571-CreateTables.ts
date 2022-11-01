import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1667334504571 implements MigrationInterface {
    name = 'CreateTables1667334504571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_image" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, CONSTRAINT "PK_d4dab02cf2667fc5b673741b322" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_image" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, "isActive" character varying NOT NULL DEFAULT true, "created_At" date NOT NULL DEFAULT '"2022-11-01T20:28:29.869Z"', "updated_At" date NOT NULL DEFAULT '"2022-11-01T20:28:29.869Z"', CONSTRAINT "UQ_66b179caee88b4a3f0bb46533d4" UNIQUE ("email"), CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "card_number" numeric(16) NOT NULL, "due_date" date NOT NULL, "card_cv" numeric(16) NOT NULL, CONSTRAINT "PK_c66c60a17b56ec882fcd8ec770b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar_image" character varying NOT NULL DEFAULT 'https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg', "password" character varying NOT NULL, "isActive" character varying NOT NULL DEFAULT true, "created_At" date NOT NULL DEFAULT '"2022-11-01T20:28:29.960Z"', "updated_At" date NOT NULL DEFAULT '"2022-11-01T20:28:29.960Z"', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlists_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "users_count" integer NOT NULL, "created_At" date NOT NULL, "userId" uuid, "playlistId" uuid, CONSTRAINT "PK_a6856b83b783a3503e3d9b3e33f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "link_playlist" character varying NOT NULL, "created_At" date NOT NULL DEFAULT '"2022-11-01T20:28:29.960Z"', "updated_At" date NOT NULL DEFAULT '"2022-11-01T20:28:29.960Z"', CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlists_musics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "music_count" integer NOT NULL, "created_At" date NOT NULL, "playlistId" uuid, "musicId" uuid, CONSTRAINT "PK_c035464035faa029608c5e70357" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "music" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistName" character varying NOT NULL, "genre" character varying NOT NULL, "description" character varying NOT NULL, "duration" double precision NOT NULL, "created_At" date NOT NULL DEFAULT '"2022-11-01T20:28:29.961Z"', "updated_At" date NOT NULL DEFAULT '"2022-11-01T20:28:29.961Z"', "artistId" uuid, CONSTRAINT "PK_c92b010dd889692dd54286f75e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "playlists_users" ADD CONSTRAINT "FK_d57fadb2465ee0d835756194498" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists_users" ADD CONSTRAINT "FK_f773533cc5eb5db8b97fa1c6458" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists_musics" ADD CONSTRAINT "FK_8391891c711a5cb2afffdfbcca6" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists_musics" ADD CONSTRAINT "FK_a7e34146f7cb09d5f91acdb02e7" FOREIGN KEY ("musicId") REFERENCES "music"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "music" ADD CONSTRAINT "FK_8fdd0a21f58494eba65266a1e05" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "music" DROP CONSTRAINT "FK_8fdd0a21f58494eba65266a1e05"`);
        await queryRunner.query(`ALTER TABLE "playlists_musics" DROP CONSTRAINT "FK_a7e34146f7cb09d5f91acdb02e7"`);
        await queryRunner.query(`ALTER TABLE "playlists_musics" DROP CONSTRAINT "FK_8391891c711a5cb2afffdfbcca6"`);
        await queryRunner.query(`ALTER TABLE "playlists_users" DROP CONSTRAINT "FK_f773533cc5eb5db8b97fa1c6458"`);
        await queryRunner.query(`ALTER TABLE "playlists_users" DROP CONSTRAINT "FK_d57fadb2465ee0d835756194498"`);
        await queryRunner.query(`DROP TABLE "music"`);
        await queryRunner.query(`DROP TABLE "playlists_musics"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "playlists_users"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "payment_user"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "adm"`);
    }

}
