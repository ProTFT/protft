import { MigrationInterface, QueryRunner } from "typeorm";

export class CircuitEnhance1687545768831 implements MigrationInterface {
  name = "CircuitEnhance1687545768831";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "circuitId" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "circuitPointsEarned" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "circuitPointsEarned"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "circuitId"`,
    );
  }
}
