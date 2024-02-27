import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAudit1699907907998 implements MigrationInterface {
  name = "UserAudit1699907907998";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_link" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" ADD CONSTRAINT "UQ_54994f1927c1f5ee1027c1e81c3" UNIQUE ("tournamentId")`,
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
      `ALTER TABLE "tournament_metadata" DROP CONSTRAINT "UQ_54994f1927c1f5ee1027c1e81c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "updatedBy"`);
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "updatedBy"`);
    await queryRunner.query(
      `ALTER TABLE "round_result" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(`ALTER TABLE "lobby" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "lobby" DROP COLUMN "updatedBy"`);
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "updatedBy"`);
    await queryRunner.query(
      `ALTER TABLE "player_link" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" DROP COLUMN "updatedBy"`,
    );
  }
}
