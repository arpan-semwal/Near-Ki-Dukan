import { EntitySchema } from 'typeorm';

export const TblSalonSubcategory = new EntitySchema({
  name: 'TblSalonSubcategory',
  tableName: 'tbl_salon_subcategory',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    sub_category: {  // Ensure this matches the column name in your database
      type: 'varchar',
      length: 255,
      name: 'sub_category',
    },
    category_id: {
      type: 'int',
      name: 'category_id',
    },
  },
  relations: {
    category: {
      type: 'many-to-one',
      target: 'Category',
      joinColumn: { name: 'category_id' },
    },
  },
  mainServices: {
    target: 'TblSalonMainServices',
    type: 'one-to-many',
    mappedBy: 'subCategory',
  },
});
