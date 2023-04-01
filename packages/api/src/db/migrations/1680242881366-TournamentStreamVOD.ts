import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentStreamVOD1680242881366 implements MigrationInterface {
  name = "TournamentStreamVOD1680242881366";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" ADD "isVOD" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" DROP COLUMN "isVOD"`,
    );
  }
}
