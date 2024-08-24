import { EntitySchema } from 'typeorm';
import { TblProductMaster } from './TblProductMaster.js'; // Ensure this path is correct

export const ShopkeeperProducts = new EntitySchema({
  name: 'ShopkeeperProduct',
  tableName: 'shopkeeper_products',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    phoneNumber: {
      type: 'varchar',
      length: 15,
    },
    productId: {
      type: 'int',
    },
  },
  relations: {
    product: {
      target: TblProductMaster,
      type: 'many-to-one',
      joinColumn: { name: 'productId' },
      inverseSide: 'id',
      onDelete: 'CASCADE',
    },
  },
});
