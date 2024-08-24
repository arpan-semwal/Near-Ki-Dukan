import { EntitySchema } from 'typeorm';

export const TblSalonSubSubServices = new EntitySchema({
  name: 'TblSalonSubSubServices',
  tableName: 'tbl_salon_sub_sub_services',
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
    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    description: {
      type: 'varchar',
      length: 500,
    },
    mainServiceId: {
      type: 'int',
      name: 'main_service_id',
    },
    subCategoryId: {
      type: 'int',
      name: 'sub_category_id',
    },
  },
  relations: {
    mainService: {
      target: 'TblSalonMainServices',
      type: 'many-to-one',
      joinColumn: {
        name: 'main_service_id',
      },
    },
    subCategory: {
      target: 'TblSalonSubcategory',
      type: 'many-to-one',
      joinColumn: {
        name: 'sub_category_id',
      },
    },
  },
});
