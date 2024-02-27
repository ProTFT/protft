import { MigrationInterface, QueryRunner } from "typeorm";

export class StageDate1683967304773 implements MigrationInterface {
  name = "StageDate1683967304773";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "startDateTime" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "startDateTime"`);
  }
}
