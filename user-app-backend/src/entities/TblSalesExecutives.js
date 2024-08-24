import { EntitySchema } from 'typeorm';

export const TblSalesExecutives = new EntitySchema({
  name: 'TblSalesExecutives',
  tableName: 'tbl_salesexecutives',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstName: {
      type: 'varchar',
      nullable: true,
    },
    lastName: {
      type: 'varchar',
      nullable: true,
    },
    phoneNumber: {
      type: 'varchar',
      length: 15,
      unique: true,
    },
    pincode: {
      type: 'varchar',
      nullable: true,
    },
    level: {
      type: 'varchar',
      nullable: true,
    },
    aadhar: {
      type: 'varchar',
      nullable: true,
    },
    upi: {
      type: 'varchar',
      nullable: true,
    },
    pancard: {
      type: 'varchar',
      nullable: true,
    },
    addedBy: {
      type: 'varchar',
      length: 15,
      nullable: true,
    },
  },
});
