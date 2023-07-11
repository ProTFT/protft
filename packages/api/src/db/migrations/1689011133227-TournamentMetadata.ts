import { MigrationInterface, QueryRunner } from "typeorm";

export class TournamentMetadata1689011133227 implements MigrationInterface {
  name = "TournamentMetadata1689011133227";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "server" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "apiMinorRegion" character varying NOT NULL, "apiMajorRegion" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e16254733ff2264f94f856316ee" UNIQUE ("name"), CONSTRAINT "PK_f8b8af38bdc23b447c0a57c7937" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tournament_metadata" ("tournamentId" integer NOT NULL, "title" character varying NOT NULL, "roleName" character varying NOT NULL, "roleId" integer NOT NULL, "waitlistRoleId" integer, "titleLink" character varying, "registrationRules" character varying, "color" character varying, "hasRegistrationStarted" boolean NOT NULL DEFAULT false, "hasRegistrationEnded" boolean NOT NULL DEFAULT false, "registrationOpen" TIMESTAMP NOT NULL, "registrationClose" TIMESTAMP NOT NULL, "discordChannelId" integer, "discordMessageId" integer, "checkinChannelId" integer, "embedStatus" character varying NOT NULL DEFAULT 'Active', "embedUpdate" boolean NOT NULL DEFAULT false, "serverId" integer NOT NULL, "spreadsheetId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54994f1927c1f5ee1027c1e81c3" PRIMARY KEY ("tournamentId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "player_account" ("id" SERIAL NOT NULL, "playerId" integer NOT NULL, "serverId" integer NOT NULL, "summonerName" character varying NOT NULL, "puuid" character varying NOT NULL, "validated" boolean NOT NULL, "rank" character varying NOT NULL, "rankIndex" boolean NOT NULL, "lp" integer NOT NULL, "homeRegion" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8f34fdab2e0645520a937c67a70" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" ADD CONSTRAINT "FK_df7fcf9a1f89778b3d121bfa0ae" FOREIGN KEY ("serverId") REFERENCES "server"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "player_account" ADD CONSTRAINT "FK_24c30acc8eaa721f43d16f25c91" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "player_account" DROP CONSTRAINT "FK_24c30acc8eaa721f43d16f25c91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tournament_metadata" DROP CONSTRAINT "FK_df7fcf9a1f89778b3d121bfa0ae"`,
    );
    await queryRunner.query(`DROP TABLE "player_account"`);
    await queryRunner.query(`DROP TABLE "tournament_metadata"`);
    await queryRunner.query(`DROP TABLE "server"`);
  }
}
