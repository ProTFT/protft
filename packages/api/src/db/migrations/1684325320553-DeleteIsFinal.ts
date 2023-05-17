import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteIsFinal1684325320553 implements MigrationInterface {
  name = "DeleteIsFinal1684325320553";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "isFinal"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "isFinal" boolean NOT NULL DEFAULT false`,
    );
  }
}
