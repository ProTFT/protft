import { MigrationInterface, QueryRunner } from "typeorm";

export class Rating1682447632938 implements MigrationInterface {
  name = "Rating1682447632938";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rating" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player_rating" ("id" SERIAL NOT NULL, "ratingId" integer NOT NULL, "playerId" integer NOT NULL, "tournamentId" integer NOT NULL, "ratingVariation" integer NOT NULL, "currentMu" integer NOT NULL, "currentSigma" integer NOT NULL, "currentRating" integer NOT NULL, CONSTRAINT "PK_de64778b3d28c48e638779f28d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e767c81c74078028ca7d814bbd" ON "player_rating" ("playerId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD CONSTRAINT "FK_7400723dd0a67058ef88a827f49" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD CONSTRAINT "FK_e767c81c74078028ca7d814bbdf" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD CONSTRAINT "FK_3e7d7a58739089483b3007d1c43" FOREIGN KEY ("ratingId") REFERENCES "rating"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP CONSTRAINT "FK_3e7d7a58739089483b3007d1c43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP CONSTRAINT "FK_e767c81c74078028ca7d814bbdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP CONSTRAINT "FK_7400723dd0a67058ef88a827f49"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e767c81c74078028ca7d814bbd"`,
    );
    await queryRunner.query(`DROP TABLE "player_rating"`);
    await queryRunner.query(`DROP TABLE "rating"`);
  }
}
