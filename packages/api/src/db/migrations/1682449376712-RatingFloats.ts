import { MigrationInterface, QueryRunner } from "typeorm";

export class RatingFloats1682449376712 implements MigrationInterface {
  name = "RatingFloats1682449376712";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP COLUMN "ratingVariation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD "ratingVariation" numeric(20,10) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP COLUMN "currentMu"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD "currentMu" numeric(20,10) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP COLUMN "currentSigma"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD "currentSigma" numeric(20,10) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP COLUMN "currentRating"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD "currentRating" numeric(20,10) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP COLUMN "currentRating"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD "currentRating" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP COLUMN "currentSigma"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD "currentSigma" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP COLUMN "currentMu"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD "currentMu" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" DROP COLUMN "ratingVariation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_rating" ADD "ratingVariation" integer NOT NULL`,
    );
  }
}
