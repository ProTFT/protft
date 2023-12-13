import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatsIndex1702481823486 implements MigrationInterface {
  name = "AddStatsIndex1702481823486";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_426993dade6f1dba42b61ad69b" ON "round_result" ("lobbyPlayerId") WHERE "deletedAt" is null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_426993dade6f1dba42b61ad69b"`,
    );
  }
}
