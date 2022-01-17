import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAuthMigration1642439416571 implements MigrationInterface {
  name = 'UserAuthMigration1642439416571';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`index_user_email\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`email_verified_at\` timestamp NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`users-email-unique\` ON \`user\` (\`email\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`users-email-unique\` ON \`user\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`firstName\` \`firstName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`email_verified_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`index_user_email\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
  }
}
