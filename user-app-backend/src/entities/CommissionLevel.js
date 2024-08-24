import { EntitySchema } from 'typeorm';

export const CommissionLevel = new EntitySchema({
  name: 'CommissionLevel',
  tableName: 'commission_level',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    from_level: {
      type: 'varchar',
      length: 10,
    },
    to_level: {
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
