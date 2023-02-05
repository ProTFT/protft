import { MigrationInterface, QueryRunner } from "typeorm";

export class Indexes1675531482498 implements MigrationInterface {
  name = "Indexes1675531482498";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP CONSTRAINT "FK_7e9ae01205a8538afed65cf85fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP CONSTRAINT "FK_65355f632c40193663d7eca7063"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "visibility" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7baa5220210c74f8db27c06f8b" ON "player" ("name") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_fd3768c309e99f68d3a1cbadc7" ON "player" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_698317abb506538c31157f1f8d" ON "tournament" ("slug") `,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD CONSTRAINT "FK_65355f632c40193663d7eca7063" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD CONSTRAINT "FK_7e9ae01205a8538afed65cf85fa" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP CONSTRAINT "FK_7e9ae01205a8538afed65cf85fa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP CONSTRAINT "FK_65355f632c40193663d7eca7063"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_698317abb506538c31157f1f8d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd3768c309e99f68d3a1cbadc7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7baa5220210c74f8db27c06f8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ALTER COLUMN "visibility" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD CONSTRAINT "FK_65355f632c40193663d7eca7063" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD CONSTRAINT "FK_7e9ae01205a8538afed65cf85fa" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
