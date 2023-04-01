import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentStream1680189677718 implements MigrationInterface {
  name = "TournamentStream1680189677718";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tournament_stream" ("tournamentId" integer NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "platform" character varying NOT NULL, "language" character varying NOT NULL, "isLive" boolean NOT NULL, CONSTRAINT "PK_d1a0da7dc36da2f4377eda2ec9e" PRIMARY KEY ("tournamentId", "name"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tournament_stream"`);
  }
}
