import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRole1699962833676 implements MigrationInterface {
  name = "UserRole1699962833676";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_roles_enum" AS ENUM('WM', 'TO', 'PL')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "roles" "public"."user_roles_enum" array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
    await queryRunner.query(`DROP TYPE "public"."user_roles_enum"`);
  }
}
