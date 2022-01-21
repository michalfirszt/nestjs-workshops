import { MigrationInterface, QueryRunner } from 'typeorm';

export class FlowMigration1642778213282 implements MigrationInterface {
  name = 'FlowMigration1642778213282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`flow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NULL, \`state\` enum ('draft', 'in_progress', 'finished', 'cancelled') NOT NULL DEFAULT 'draft', \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`flow\` ADD CONSTRAINT \`fk_flow_user_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`flow\` DROP FOREIGN KEY \`fk_flow_user_user_id\``,
    );
    await queryRunner.query(`DROP TABLE \`flow\``);
  }
}
