import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709685897280 implements MigrationInterface {
    name = 'Default1709685897280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`remember_message\` DROP FOREIGN KEY \`FK_cb510e19feba7e1bcb485d79181\``);
        await queryRunner.query(`ALTER TABLE \`remember_message\` CHANGE \`remember_date\` \`remember_date\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`remember_message\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`remember_message\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`remember_message\` ADD CONSTRAINT \`FK_cb510e19feba7e1bcb485d79181\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`remember_message\` DROP FOREIGN KEY \`FK_cb510e19feba7e1bcb485d79181\``);
        await queryRunner.query(`ALTER TABLE \`remember_message\` CHANGE \`user_id\` \`user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`remember_message\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`remember_message\` CHANGE \`remember_date\` \`remember_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`remember_message\` ADD CONSTRAINT \`FK_cb510e19feba7e1bcb485d79181\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
