import {MigrationInterface, QueryRunner} from "typeorm";

export class PlayerLinks1687192987007 implements MigrationInterface {
    name = 'PlayerLinks1687192987007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "circuit" DROP CONSTRAINT "FK_0d5b34209deae7b777087e171d2"`);
        await queryRunner.query(`CREATE TABLE "player_link" ("id" SERIAL NOT NULL, "playerId" integer NOT NULL, "type" character varying NOT NULL, "link" character varying NOT NULL, CONSTRAINT "PK_b9b9d367b54e4272b3d01732069" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_968831590e11a73fea58c6941b" ON "player_link" ("playerId", "type") `);
        await queryRunner.query(`ALTER TABLE "tournament_result" ADD "qualifyTo" integer array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "tournament_result" ADD "currency" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "tournament_result" ADD "prizeInUSD" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tournament_result" ADD "circuitId" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "tournament_result" ADD "circuitPointsEarned" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "circuit" ADD CONSTRAINT "FK_0d5b34209deae7b777087e171d2" FOREIGN KEY ("setId") REFERENCES "set"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_link" ADD CONSTRAINT "FK_a223acee5209f1f9aaa0f9308a0" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player_link" DROP CONSTRAINT "FK_a223acee5209f1f9aaa0f9308a0"`);
        await queryRunner.query(`ALTER TABLE "circuit" DROP CONSTRAINT "FK_0d5b34209deae7b777087e171d2"`);
        await queryRunner.query(`ALTER TABLE "tournament_result" DROP COLUMN "circuitPointsEarned"`);
        await queryRunner.query(`ALTER TABLE "tournament_result" DROP COLUMN "circuitId"`);
        await queryRunner.query(`ALTER TABLE "tournament_result" DROP COLUMN "prizeInUSD"`);
        await queryRunner.query(`ALTER TABLE "tournament_result" DROP COLUMN "currency"`);
        await queryRunner.query(`ALTER TABLE "tournament_result" DROP COLUMN "qualifyTo"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_968831590e11a73fea58c6941b"`);
        await queryRunner.query(`DROP TABLE "player_link"`);
        await queryRunner.query(`ALTER TABLE "circuit" ADD CONSTRAINT "FK_0d5b34209deae7b777087e171d2" FOREIGN KEY ("setId") REFERENCES "set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
