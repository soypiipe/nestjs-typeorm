import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelationProductBrand1663447766312 implements MigrationInterface {
    name = 'addRelationProductBrand1663447766312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "creatredAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "creatredAt"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brandId"`);
    }

}
