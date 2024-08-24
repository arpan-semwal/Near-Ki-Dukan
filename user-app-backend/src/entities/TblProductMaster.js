// src/entities/TblProductMaster.js
import { EntitySchema } from 'typeorm';

export const TblProductMaster = new EntitySchema({
    name: 'Product',
    tableName: 'tbl_product_master',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        main_category: {
            type: 'varchar',
        },
        product_name: {
            type: 'varchar',
        },
        brand_name: {
            type: 'varchar',
        },
        precise_brand_name: {
            type: 'varchar',
            nullable: true,
        },
        price: {
            type: 'decimal',
        },
        weight: {
            type: 'varchar',
        },
        type: {
            type: 'varchar',
        },
        picture_path: {
            type: 'varchar',
            nullable: true,
        },
        weight_type: {
            type: 'varchar',
            nullable: true,
        },
    },
});
