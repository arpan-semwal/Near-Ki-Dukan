import { EntitySchema } from 'typeorm';

export const Payment = new EntitySchema({
  name: "Payment",
  tableName: "payments",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    amount: {
      type: "float",
    },
    status: {
      type: "varchar",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    details: {
      type: "one-to-many",
      target: "PaymentDetail",
      inverseSide: "payment",
    },
  },
});