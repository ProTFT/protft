import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIndexesDeletedAt1701023662261 implements MigrationInterface {
  name = "UpdateIndexesDeletedAt1701023662261";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_968831590e11a73fea58c6941b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7baa5220210c74f8db27c06f8b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd3768c309e99f68d3a1cbadc7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_35c7594f4dfec130c74c7d3f31"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_45a184e9c801eb60ae809a40e5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_698317abb506538c31157f1f8d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_73fd0a46cfe9a31ef4f1c78869"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5b633024dba3fae7e64a14ec80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" DROP CONSTRAINT "FK_54994f1927c1f5ee1027c1e81c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" ADD CONSTRAINT "UQ_54994f1927c1f5ee1027c1e81c3" UNIQUE ("tournamentId")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e2930387f3656d928d41c2345c" ON "player_link" ("playerId", "type") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87c5480430e9b5c25e113f0849" ON "player" ("name") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_22c31727454ae10396a79140b4" ON "player" ("slug") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_cab123c79fc7899e434e94390b" ON "lobby" ("lobbyGroupId", "sequence") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_3ef2a6af970914546646d38db8" ON "round" ("stageId", "sequence") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_8e37ecdc954f1a837a48e7aecd" ON "tournament" ("slug") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_35aa9dc55038054b72025be88e" ON "stage" ("tournamentId", "sequence") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d58ef081eb6f01b1f1b711f366" ON "lobby_group" ("stageId", "sequence") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" ADD CONSTRAINT "FK_54994f1927c1f5ee1027c1e81c3" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" DROP CONSTRAINT "FK_54994f1927c1f5ee1027c1e81c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d58ef081eb6f01b1f1b711f366"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_35aa9dc55038054b72025be88e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8e37ecdc954f1a837a48e7aecd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3ef2a6af970914546646d38db8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cab123c79fc7899e434e94390b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_22c31727454ae10396a79140b4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_87c5480430e9b5c25e113f0849"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e2930387f3656d928d41c2345c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" DROP CONSTRAINT "UQ_54994f1927c1f5ee1027c1e81c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" ADD CONSTRAINT "FK_54994f1927c1f5ee1027c1e81c3" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5b633024dba3fae7e64a14ec80" ON "lobby_group" ("stageId", "sequence") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_73fd0a46cfe9a31ef4f1c78869" ON "stage" ("sequence", "tournamentId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_698317abb506538c31157f1f8d" ON "tournament" ("slug") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_45a184e9c801eb60ae809a40e5" ON "round" ("stageId", "sequence") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_35c7594f4dfec130c74c7d3f31" ON "lobby" ("lobbyGroupId", "sequence") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_fd3768c309e99f68d3a1cbadc7" ON "player" ("slug") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7baa5220210c74f8db27c06f8b" ON "player" ("name") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_968831590e11a73fea58c6941b" ON "player_link" ("playerId", "type") `,
    );
  }
}
