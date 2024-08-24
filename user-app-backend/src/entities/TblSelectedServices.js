import { EntitySchema } from 'typeorm';

export const TblSelectedServices = new EntitySchema({
  name: 'TblSelectedServices',
  tableName: 'tbl_selected_services',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    phoneNumber: {
      type: 'varchar',
      length: 20,
    },
    mainServiceId: {
      type: 'int',
      name: 'main_service_id',
    },
    subServiceId: {
      type: 'int',
      name: 'sub_service_id',
      nullable: true,
    },
    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
  },
  relations: {
    mainService: {
      target: 'TblSalonMainServices',
      type: 'many-to-one',
      joinColumn: {
        name: 'sub_category_id',
      },
    },
    subService: {
      target: 'TblSalonSubSubServices',
      type: 'many-to-one',
      joinColumn: {
        name: 'sub_service_id',
      },
    },
  },
});
