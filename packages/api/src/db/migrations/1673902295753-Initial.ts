import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1673902295753 implements MigrationInterface {
  name = "Initial1673902295753";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "player" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "region" character varying, "country" character varying, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lobby_player_info" ("id" SERIAL NOT NULL, "lobbyId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_be6493f5a22884eba8167dc724f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_120b5eabab7939b2f8f529f22d" ON "lobby_player_info" ("lobbyId", "playerId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "lobby" ("id" SERIAL NOT NULL, "stageId" integer NOT NULL, "lobbyGroupId" integer, "name" character varying NOT NULL, "sequence" integer NOT NULL, CONSTRAINT "PK_0d9e681a820740df03d4ba784bd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_35c7594f4dfec130c74c7d3f31" ON "lobby" ("lobbyGroupId", "sequence") `,
    );
    await queryRunner.query(
      `CREATE TABLE "round_result" ("roundId" integer NOT NULL, "lobbyPlayerId" integer NOT NULL, "position" integer NOT NULL, CONSTRAINT "PK_72d47dac577d17b0395c777f51b" PRIMARY KEY ("roundId", "lobbyPlayerId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "round" ("id" SERIAL NOT NULL, "stageId" integer NOT NULL, "sequence" integer NOT NULL, CONSTRAINT "PK_34bd959f3f4a90eb86e4ae24d2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_45a184e9c801eb60ae809a40e5" ON "round" ("stageId", "sequence") `,
    );
    await queryRunner.query(
      `CREATE TABLE "point_schema" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c446dda4a116731062006ea750e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "points" ("pointSchemaId" integer NOT NULL, "position" integer NOT NULL, "points" integer NOT NULL, CONSTRAINT "PK_133f948755f91f1b79140e7d50a" PRIMARY KEY ("pointSchemaId", "position"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_133f948755f91f1b79140e7d50" ON "points" ("pointSchemaId", "position") `,
    );
    await queryRunner.query(
      `CREATE TABLE "set" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3a80144a9f862484a2cae876eed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tournament" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "region" character varying array, "host" character varying, "participantsNumber" integer, "prizePool" integer, "currency" character varying, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "setId" integer NOT NULL, CONSTRAINT "PK_449f912ba2b62be003f0c22e767" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stage_player_info" ("stageId" integer NOT NULL, "playerId" integer NOT NULL, "extraPoints" integer, "tiebreakerRanking" integer, CONSTRAINT "PK_8c89bd26cf5bd1fe0438326bbb4" PRIMARY KEY ("stageId", "playerId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stage" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "sequence" integer NOT NULL, "isFinal" boolean NOT NULL DEFAULT false, "tournamentId" integer NOT NULL, "pointSchemaId" integer NOT NULL, "tiebreakers" integer array, CONSTRAINT "PK_c54d11b3c24a188262844af1612" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_73fd0a46cfe9a31ef4f1c78869" ON "stage" ("tournamentId", "sequence") `,
    );
    await queryRunner.query(
      `CREATE TABLE "lobby_group" ("id" SERIAL NOT NULL, "stageId" integer NOT NULL, "sequence" integer NOT NULL, "roundsPlayed" integer NOT NULL, CONSTRAINT "PK_da1d9dd012a81dc9f6eab563c89" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5b633024dba3fae7e64a14ec80" ON "lobby_group" ("stageId", "sequence") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "user" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a" UNIQUE ("user"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tournament_players_player" ("tournamentId" integer NOT NULL, "playerId" integer NOT NULL, CONSTRAINT "PK_94d8ba641e1bca3111f1d4e9fc1" PRIMARY KEY ("tournamentId", "playerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9453270aed1e0eb812a60d6b49" ON "tournament_players_player" ("tournamentId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_db87d44b293849d97c543a9d52" ON "tournament_players_player" ("playerId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" ADD CONSTRAINT "FK_665197c7b38eb566c3b44740553" FOREIGN KEY ("lobbyId") REFERENCES "lobby"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" ADD CONSTRAINT "FK_f9a6c0aea128c0ae62ada925c5d" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby" ADD CONSTRAINT "FK_7d06ca02170da5e80dcaf797c81" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby" ADD CONSTRAINT "FK_80eb69a8a933e7a9bb8ff9fc280" FOREIGN KEY ("lobbyGroupId") REFERENCES "lobby_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" ADD CONSTRAINT "FK_dfc94196da7f2a17967d0bfe4d0" FOREIGN KEY ("lobbyPlayerId") REFERENCES "lobby_player_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" ADD CONSTRAINT "FK_4a856e6771a0a08cde4b2949f53" FOREIGN KEY ("roundId") REFERENCES "round"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD CONSTRAINT "FK_60d74f65cc5611b2a646c1cfd28" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "points" ADD CONSTRAINT "FK_ecb79fbc2c31ab002339cdf647c" FOREIGN KEY ("pointSchemaId") REFERENCES "point_schema"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD CONSTRAINT "FK_9bf2eea00c72eb617f20df15d75" FOREIGN KEY ("setId") REFERENCES "set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD CONSTRAINT "FK_65355f632c40193663d7eca7063" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD CONSTRAINT "FK_7e9ae01205a8538afed65cf85fa" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD CONSTRAINT "FK_fbdb4376e3f5356708ef21e3b5d" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" ADD CONSTRAINT "FK_44ea5b3e9d193402eb456e70cc5" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_players_player" ADD CONSTRAINT "FK_9453270aed1e0eb812a60d6b490" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_players_player" ADD CONSTRAINT "FK_db87d44b293849d97c543a9d52c" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_players_player" DROP CONSTRAINT "FK_db87d44b293849d97c543a9d52c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_players_player" DROP CONSTRAINT "FK_9453270aed1e0eb812a60d6b490"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" DROP CONSTRAINT "FK_44ea5b3e9d193402eb456e70cc5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" DROP CONSTRAINT "FK_fbdb4376e3f5356708ef21e3b5d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP CONSTRAINT "FK_7e9ae01205a8538afed65cf85fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP CONSTRAINT "FK_65355f632c40193663d7eca7063"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" DROP CONSTRAINT "FK_9bf2eea00c72eb617f20df15d75"`,
    );
    await queryRunner.query(
      `ALTER TABLE "points" DROP CONSTRAINT "FK_ecb79fbc2c31ab002339cdf647c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" DROP CONSTRAINT "FK_60d74f65cc5611b2a646c1cfd28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" DROP CONSTRAINT "FK_4a856e6771a0a08cde4b2949f53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" DROP CONSTRAINT "FK_dfc94196da7f2a17967d0bfe4d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby" DROP CONSTRAINT "FK_80eb69a8a933e7a9bb8ff9fc280"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby" DROP CONSTRAINT "FK_7d06ca02170da5e80dcaf797c81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" DROP CONSTRAINT "FK_f9a6c0aea128c0ae62ada925c5d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" DROP CONSTRAINT "FK_665197c7b38eb566c3b44740553"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_db87d44b293849d97c543a9d52"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9453270aed1e0eb812a60d6b49"`,
    );
    await queryRunner.query(`DROP TABLE "tournament_players_player"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5b633024dba3fae7e64a14ec80"`,
    );
    await queryRunner.query(`DROP TABLE "lobby_group"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_73fd0a46cfe9a31ef4f1c78869"`,
    );
    await queryRunner.query(`DROP TABLE "stage"`);
    await queryRunner.query(`DROP TABLE "stage_player_info"`);
    await queryRunner.query(`DROP TABLE "tournament"`);
    await queryRunner.query(`DROP TABLE "set"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_133f948755f91f1b79140e7d50"`,
    );
    await queryRunner.query(`DROP TABLE "points"`);
    await queryRunner.query(`DROP TABLE "point_schema"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_45a184e9c801eb60ae809a40e5"`,
    );
    await queryRunner.query(`DROP TABLE "round"`);
    await queryRunner.query(`DROP TABLE "round_result"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_35c7594f4dfec130c74c7d3f31"`,
    );
    await queryRunner.query(`DROP TABLE "lobby"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_120b5eabab7939b2f8f529f22d"`,
    );
    await queryRunner.query(`DROP TABLE "lobby_player_info"`);
    await queryRunner.query(`DROP TABLE "player"`);
  }
}
