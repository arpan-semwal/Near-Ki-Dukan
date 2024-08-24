import { EntitySchema } from 'typeorm';

export const Session = new EntitySchema({
  name: 'Session',
  tableName: 'sessions',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    user_id: {
      type: 'int',
    },
    session_token: {
      type: 'varchar',
    },
    login_time: {
      type: 'datetime',
    },
    expiration_time: {
      type: 'datetime',
    },
  },
});
