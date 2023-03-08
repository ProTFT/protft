import { MigrationInterface, QueryRunner } from "typeorm";

export class StageQualifiedCount1678281475842 implements MigrationInterface {
  name = "StageQualifiedCount1678281475842";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "qualifiedCount" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "qualifiedCount"`);
  }
}
