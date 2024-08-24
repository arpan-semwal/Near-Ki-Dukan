import { EntitySchema } from 'typeorm';

export const Otp = new EntitySchema({
  name: 'Otp',
  tableName: 'otps',
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
    otp: {
      type: 'varchar',
      length: 6,
    },
    otpExpiry: {
      type: 'datetime',
    },
  },
});
