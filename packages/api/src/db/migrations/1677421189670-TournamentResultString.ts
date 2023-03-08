import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentResultString1677421189670 implements MigrationInterface {
  name = "TournamentResultString1677421189670";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "PK_cf03c78f26b0cfc3915a05b4bee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "PK_c233f37a593cbd5d9aeb83e6da2" PRIMARY KEY ("tournamentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "finalPosition"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "finalPosition" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "PK_c233f37a593cbd5d9aeb83e6da2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "PK_cf03c78f26b0cfc3915a05b4bee" PRIMARY KEY ("tournamentId", "finalPosition")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "PK_cf03c78f26b0cfc3915a05b4bee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "PK_c233f37a593cbd5d9aeb83e6da2" PRIMARY KEY ("tournamentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "finalPosition"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "finalPosition" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP CONSTRAINT "PK_c233f37a593cbd5d9aeb83e6da2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD CONSTRAINT "PK_cf03c78f26b0cfc3915a05b4bee" PRIMARY KEY ("tournamentId", "finalPosition")`,
    );
  }
}
