import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentResultFixes1678289452183 implements MigrationInterface {
  name = "TournamentResultFixes1678289452183";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_052ae98794bfbacfab45d4668d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "FK_93b4bfe024537badece793eb05b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "PK_cf03c78f26b0cfc3915a05b4bee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "PK_8773fb7657d8b358f2f9961ebae" PRIMARY KEY ("tournamentId", "finalPosition", "playerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "PK_8773fb7657d8b358f2f9961ebae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "PK_052ae98794bfbacfab45d4668dc" PRIMARY KEY ("tournamentId", "playerId")`,
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
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "PK_052ae98794bfbacfab45d4668dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "PK_8773fb7657d8b358f2f9961ebae" PRIMARY KEY ("tournamentId", "playerId", "finalPosition")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "PK_8773fb7657d8b358f2f9961ebae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "PK_cf03c78f26b0cfc3915a05b4bee" PRIMARY KEY ("tournamentId", "finalPosition")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "FK_93b4bfe024537badece793eb05b" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_052ae98794bfbacfab45d4668d" ON "tournament_result" ("tournamentId", "playerId") `,
    );
  }
}
