import { MigrationInterface, QueryRunner } from "typeorm";

export class LobbyPlayerConstraint1675955520563 implements MigrationInterface {
  name = "LobbyPlayerConstraint1675955520563";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_120b5eabab7939b2f8f529f22d"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "lobbyPlayer" ON "lobby_player_info" ("lobbyId", "playerId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."lobbyPlayer"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_120b5eabab7939b2f8f529f22d" ON "lobby_player_info" ("lobbyId", "playerId") `,
    );
  }
}
