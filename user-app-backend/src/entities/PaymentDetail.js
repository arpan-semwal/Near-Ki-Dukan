import { EntitySchema } from 'typeorm';

export const PaymentDetail = new EntitySchema({
  name: "PaymentDetail",
  tableName: "payment_details",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    provider: {
      type: "varchar",
    },
    providerTransactionId: {
      type: "varchar",
    },
    paymentId: {
      type: "int",
    },
  },
  relations: {
    payment: {
      type: "many-to-one",
      target: "Payment",
      joinColumn: { name: "paymentId" },
      inverseSide: "details",
    },
  },
});