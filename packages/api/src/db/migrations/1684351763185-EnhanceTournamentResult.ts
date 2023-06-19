import { MigrationInterface, QueryRunner } from "typeorm";

export class EnhanceTournamentResult1684351763185
  implements MigrationInterface
{
  name = "EnhanceTournamentResult1684351763185";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "qualifyTo" integer array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "currency" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "prizeInUSD" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "prizeInUSD"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "qualifyTo"`,
    );
  }
}
