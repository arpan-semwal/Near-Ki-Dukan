// src/entities/TblOrders.js

import { EntitySchema } from 'typeorm';

export const TblOrders = new EntitySchema({
  name: 'TblOrders',
  tableName: 'tbl_orders',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    customerName: {
      type: 'varchar',
    },
    custPhoneNumber: {
      type: 'varchar',
    },
    cartItems: {
      type: 'json',
    },
    totalPrice: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    selectedDate: {
      type: 'date',
      nullable: true,
    },
    selectedTime: {
      type: 'varchar',
      length: 5,  // Assuming time format like "HH:MM"
      nullable: true,
    },
    shopID: {
      type: 'varchar',
    },
    shopkeeperName: {
      type: 'varchar',
      nullable: true
    },
    shopkeeperPhoneNumber: {
      type: 'varchar',
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
});
