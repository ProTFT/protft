import { MigrationInterface, QueryRunner } from "typeorm";

export class PlayerAlias1681921847250 implements MigrationInterface {
  name = "PlayerAlias1681921847250";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player" ADD "alias" character varying array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" ADD CONSTRAINT "FK_dba6fb7e0f06f6f4b40c789f15f" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" DROP CONSTRAINT "FK_dba6fb7e0f06f6f4b40c789f15f"`,
    );
    await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "alias"`);
  }
}
