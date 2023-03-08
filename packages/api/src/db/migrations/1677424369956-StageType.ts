import { MigrationInterface, QueryRunner } from "typeorm";

export class StageType1677424369956 implements MigrationInterface {
  name = "StageType1677424369956";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."stage_stagetype_enum" AS ENUM('Ranking', 'Group Based')`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "stageType" "public"."stage_stagetype_enum" NOT NULL DEFAULT 'Ranking'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "stageType"`);
    await queryRunner.query(`DROP TYPE "public"."stage_stagetype_enum"`);
  }
}
