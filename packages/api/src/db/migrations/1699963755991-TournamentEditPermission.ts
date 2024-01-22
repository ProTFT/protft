import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentEditPermission1699963755991
  implements MigrationInterface
{
  name = "TournamentEditPermission1699963755991";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "editPermission" integer array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament" DROP COLUMN "editPermission"`,
    );
  }
}
