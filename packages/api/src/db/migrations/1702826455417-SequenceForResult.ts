import { MigrationInterface, QueryRunner } from "typeorm";

export class SequenceForResult1702826455417 implements MigrationInterface {
  name = "SequenceForResult1702826455417";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "sequenceForResult" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `UPDATE "stage" set "sequenceForResult" = "sequence"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage" DROP COLUMN "sequenceForResult"`,
    );
  }
}
