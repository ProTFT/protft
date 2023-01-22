import { MigrationInterface, QueryRunner } from "typeorm";

export class Slug1674050744772 implements MigrationInterface {
  name = "Slug1674050744772";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player" ADD "slug" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "slug" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "slug"`);
  }
}
