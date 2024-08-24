import { EntitySchema } from 'typeorm';

export const NewCustomer = new EntitySchema({
  name: 'NewCustomer',
  tableName: 'newcustomers',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    phoneNumber: {
      type: 'varchar',
      length: 15,
      unique:true
    },
    name: {
      type: 'varchar',
      nullable: true,
    },
    pincode: {
      type: 'varchar',
      nullable: true,
    },
    state: {
      type: 'varchar',
      nullable: true,
    },
    city: {
      type: 'varchar',
      nullable: true,
    },
    address: {
      type: 'text',
      nullable: true,
    },
    shop_id: {
      type: 'varchar',
      nullable: true,
    },
    selectedCategory: {
      type: 'varchar',
      nullable: true,
    },
    selectedSubCategory: {
      type: 'varchar',
      nullable: true,
    },
    selectedCategoryType: {
      type: 'varchar',
      nullable: true,
    },
  },
});
