import { EntitySchema } from 'typeorm';

export const TblCommission = new EntitySchema({
  name: 'TblCommission',
  tableName: 'tbl_commission',
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
    commissionType: {
      type: 'varchar',
    },
    amount: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
  },
});
