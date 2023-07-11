import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentColumnTypes1689016610739 implements MigrationInterface {
  name = "TournamentColumnTypes1689016610739";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "description" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "image" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "image" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "image" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "image" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "description" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
