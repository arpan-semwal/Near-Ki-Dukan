// src/entities/Category.js
import { EntitySchema } from 'typeorm';
import { TblSalonSubcategory } from './TblSalonSubcategory.js';

export const Category = new EntitySchema({
  name: 'Category',
  tableName: 'category',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    type: {
      type: 'varchar',
      length: 50,
    },
    icon: {
      type: 'varchar',
      nullable: true,
    },
  },
  relations: {
    subCategories: {
      type: 'one-to-many',
      target: 'TblSalonSubcategory',
      mappedBy: 'category',
    },
  },
});
