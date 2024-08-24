import { EntitySchema } from 'typeorm';

export const LoginHistory = new EntitySchema({
  name: 'LoginHistory',
  tableName: 'login_history',
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
    userType: {
      type: 'varchar',
    },
    loginTime: {
      type: 'datetime',
    },
  },
});
