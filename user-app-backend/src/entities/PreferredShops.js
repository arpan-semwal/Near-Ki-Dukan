import { EntitySchema } from 'typeorm';

export const PreferredShops = new EntitySchema({
  name: 'PreferredShops',
  tableName: 'preferred_shops',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    customerPhoneNumber: {
      type: 'varchar',
      length: 15,
    },
    shopID: {
      type: 'varchar',
      nullable: true,
    },
    shopkeeperName: {
      type: 'varchar',
    },
    phoneNumber: {
      type: 'varchar',
      length: 15,
    },
    selectedCategory: {
      type: 'varchar',
    },
    shopType: {
      type: 'varchar',
    },
    pincode: {
      type: 'varchar',
      nullable: true,
    },
    deliverToHome: {
      type: 'varchar',
      length: 3,
      nullable: true,
    },
  },
});
