import { EntitySchema } from 'typeorm';

export const CustomerLoginHistory = new EntitySchema({
  name: 'CustomerLoginHistory',
  tableName: 'customer_login_history',
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
    loginTime: {
      type: 'datetime',
    },
  },
});
