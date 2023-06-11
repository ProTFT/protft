import { MigrationInterface, QueryRunner } from "typeorm";

export class PlayerLinks1686418212865 implements MigrationInterface {
  name = "PlayerLinks1686418212865";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "player_link" ("playerId" integer NOT NULL, "type" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_a223acee5209f1f9aaa0f9308a0" PRIMARY KEY ("playerId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" ADD CONSTRAINT "FK_a223acee5209f1f9aaa0f9308a0" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_link" DROP CONSTRAINT "FK_a223acee5209f1f9aaa0f9308a0"`,
    );
    await queryRunner.query(`DROP TABLE "player_link"`);
  }
}
