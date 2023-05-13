import { MigrationInterface, QueryRunner } from "typeorm";

export class StageDateString1683968693110 implements MigrationInterface {
  name = "StageDateString1683968693110";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "startDateTime"`);
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "startDateTime" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "startDateTime"`);
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "startDateTime" TIMESTAMP`,
    );
  }
}
