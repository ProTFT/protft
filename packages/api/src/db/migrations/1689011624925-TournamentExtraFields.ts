import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentExtraFields1689011624925 implements MigrationInterface {
  name = "TournamentExtraFields1689011624925";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "isAmateur" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "description" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "image" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "image"`);
    await queryRunner.query(
      `ALTER TABLE "tournament" DROP COLUMN "description"`,
    );
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "isAmateur"`);
  }
}
