import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoleMigration1642610230672 implements MigrationInterface {
  name = 'UserRoleMigration1642610230672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`index_user_email\` ON \`user\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`index_user_email\` ON \`user\` (\`email\`)`,
    );
  }
}
