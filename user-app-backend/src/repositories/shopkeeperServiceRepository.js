// src/repositories/mainServiceRepository.js
import { AppDataSource } from '../config/data-source.js';
import { TblSalonMainServices  } from '../entities/TblSalonMainServices.js';
import { TblSalonSubSubServices } from '../entities/TblSalonSubSubServices.js';
import { TblSelectedServices } from '../entities/TblSelectedServices.js';

export const getMainServicesBySubCategoryRepository = async (subCategory) => {
    const repository = AppDataSource.getRepository(TblSalonMainServices);
    return await repository
        .createQueryBuilder('mainService')
        .leftJoinAndSelect('mainService.subCategory', 'subCategory')
        .where('subCategory.sub_category = :subCategory', { subCategory }) // Use 'sub_category' here
        .getMany();
};

export const getSubServicesByMainServiceId = async (mainServiceId) => {
  const repository = AppDataSource.getRepository(TblSalonSubSubServices);
  return await repository
    .createQueryBuilder('subSubService')
    .where('subSubService.mainServiceId = :mainServiceId', { mainServiceId })
    .getMany();
};


// src/repositories/shopkeeperServiceRepository.js
export const saveSelectedServices = async (phoneNumber, selectedServices) => {
  // Use AppDataSource.transaction directly for transactions
  await AppDataSource.transaction(async (transactionalEntityManager) => {
      const selectedServicesRepository = transactionalEntityManager.getRepository(TblSelectedServices);
      
      for (const service of selectedServices) {
          await selectedServicesRepository.insert({
              phoneNumber: phoneNumber,
              mainServiceId: service.mainServiceId,
              subServiceId: service.subServiceId,
              price: service.price,
          });
      }
  });
};

export const getSelectedMainServicesRepository = async (phoneNumber) => {
  const repository = AppDataSource.getRepository(TblSalonMainServices);
  return await repository
      .createQueryBuilder('mainService')
      .leftJoin('TblSelectedServices', 'selectedServices', 'selectedServices.mainServiceId = mainService.id')
      .where('selectedServices.phoneNumber = :phoneNumber', { phoneNumber })
      .select(['mainService.id', 'mainService.name'])
      .distinct(true)
      .getMany();
};


export const getSelectedSubServicesRepository = async (shopPhoneNumber, mainServiceId) => {
  const repository = AppDataSource.getRepository(TblSelectedServices);
  return await repository
      .createQueryBuilder('selectedServices')
      .leftJoinAndSelect('selectedServices.subService', 'subService')
      .where('selectedServices.phoneNumber = :phoneNumber', { phoneNumber: shopPhoneNumber })
      .andWhere('selectedServices.mainServiceId = :mainServiceId', { mainServiceId })
      .select(['subService.id', 'subService.name', 'selectedServices.price', 'selectedServices.phoneNumber']) // Ensure this is included
      .getMany();
};