import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentVisibility1674404133577 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "visibility" boolean DEFAULT 'true'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament" DROP COLUMN "visibility"`,
    );
  }
}
