import { MigrationInterface, QueryRunner } from "typeorm";

export class ExpandStage1705938726460 implements MigrationInterface {
  name = "ExpandStage1705938726460";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "qualification" ("deletedAt" TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "id" SERIAL NOT NULL, "tournamentId" integer NOT NULL, "stageId" integer, "sequence" integer NOT NULL, "startPosition" integer NOT NULL, "finalPosition" integer NOT NULL, "qualifyToTournamentId" integer NOT NULL, "qualifyToStageId" integer, CONSTRAINT "PK_c8244868552c4364a5264440a66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4e07e72848ae58f161c4f33acb" ON "qualification" ("tournamentId", "stageId", "sequence") WHERE "deletedAt" is null`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" ADD "numberOfPlayers" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "qualification" ADD CONSTRAINT "FK_07ac5186b55ebbc998b5e95e146" FOREIGN KEY ("tournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "qualification" ADD CONSTRAINT "FK_83128433340bc9f7c586e4aafc1" FOREIGN KEY ("stageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "qualification" ADD CONSTRAINT "FK_ede009949b3ad2ed49d46745387" FOREIGN KEY ("qualifyToTournamentId") REFERENCES "tournament"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "qualification" ADD CONSTRAINT "FK_e88b5822b7cdf2e21dfdf6822ae" FOREIGN KEY ("qualifyToStageId") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "qualification" DROP CONSTRAINT "FK_e88b5822b7cdf2e21dfdf6822ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "qualification" DROP CONSTRAINT "FK_ede009949b3ad2ed49d46745387"`,
    );
    await queryRunner.query(
      `ALTER TABLE "qualification" DROP CONSTRAINT "FK_83128433340bc9f7c586e4aafc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "qualification" DROP CONSTRAINT "FK_07ac5186b55ebbc998b5e95e146"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stage" DROP COLUMN "numberOfPlayers"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4e07e72848ae58f161c4f33acb"`,
    );
    await queryRunner.query(`DROP TABLE "qualification"`);
  }
}
