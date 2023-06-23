import { MigrationInterface, QueryRunner } from "typeorm";

export class Circuit1687538849696 implements MigrationInterface {
  name = "Circuit1687538849696";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "circuit" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "region" character varying array NOT NULL, "setId" integer NOT NULL, "slug" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_16d20c94e486b3613872aa43cad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "circuit" ADD CONSTRAINT "FK_0d5b34209deae7b777087e171d2" FOREIGN KEY ("setId") REFERENCES "set"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "circuit" DROP CONSTRAINT "FK_0d5b34209deae7b777087e171d2"`,
    );
    await queryRunner.query(`DROP TABLE "circuit"`);
  }
}
