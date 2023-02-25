import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentResult1676824440719 implements MigrationInterface {
  name = "TournamentResult1676824440719";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tournament_result" ("tournamentId" integer NOT NULL, "finalPosition" integer NOT NULL, "playerId" integer NOT NULL, "prize" integer NOT NULL DEFAULT '0', "otherRewards" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_cf03c78f26b0cfc3915a05b4bee" PRIMARY KEY ("tournamentId", "finalPosition"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_052ae98794bfbacfab45d4668d" ON "tournament_result" ("tournamentId", "playerId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "FK_c233f37a593cbd5d9aeb83e6da2" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "FK_93b4bfe024537badece793eb05b" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "FK_93b4bfe024537badece793eb05b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "FK_c233f37a593cbd5d9aeb83e6da2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_052ae98794bfbacfab45d4668d"`,
    );
    await queryRunner.query(`DROP TABLE "tournament_result"`);
  }
}
