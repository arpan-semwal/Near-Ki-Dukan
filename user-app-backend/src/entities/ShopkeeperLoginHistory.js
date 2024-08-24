import { EntitySchema } from 'typeorm';

export const ShopkeeperLoginHistory = new EntitySchema({
  name: 'ShopkeeperLoginHistory',
  tableName: 'shopkeeper_login_history',
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
