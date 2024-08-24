import { EntitySchema } from 'typeorm';

export const Commission = new EntitySchema({
  name: 'Commission',
  tableName: 'commission_rates',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment',
    },
    level: {
      type: 'varchar',
      length: 10,
    },
    commission_amount: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
  },
});
