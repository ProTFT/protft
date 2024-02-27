import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFormatToStage1705942396139 implements MigrationInterface {
  name = "AddFormatToStage1705942396139";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "formatExplainer" character varying array`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage" DROP COLUMN "formatExplainer"`,
    );
  }
}
