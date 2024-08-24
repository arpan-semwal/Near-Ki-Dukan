import { EntitySchema } from 'typeorm';

export const TblMyProducts = new EntitySchema({
  name: 'TblMyProducts',
  tableName: 'tbl_my_products',
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
});
