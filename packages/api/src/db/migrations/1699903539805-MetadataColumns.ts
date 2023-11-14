import { MigrationInterface, QueryRunner } from "typeorm";

export class MetadataColumns1699903539805 implements MigrationInterface {
  name = "MetadataColumns1699903539805";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_link" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" ADD "createdBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "player" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "player" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "player" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" ADD "createdBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "round" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "round" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "round" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" ADD "createdBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "stage" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "createdBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "lobby" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "lobby" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" ADD "createdBy" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_result" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_stream" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(`ALTER TABLE "lobby" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "lobby" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "lobby" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "lobby" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "stage" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "lobby_group" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_group" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage_player_info" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "tournament" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "round" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "round_result" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "round_result" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lobby_player_info" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "player_link" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_link" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
