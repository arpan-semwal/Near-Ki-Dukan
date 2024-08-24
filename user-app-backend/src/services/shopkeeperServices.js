// src/services/mainServiceService.js
import { getMainServicesBySubCategoryRepository ,getSubServicesByMainServiceId,saveSelectedServices,getSelectedMainServicesRepository,getSelectedSubServicesRepository   } from '../repositories/shopkeeperServiceRepository.js';
 


export const getMainServicesBySubCategoryService = async (subCategory) => {
    try {
        const services = await getMainServicesBySubCategoryRepository(subCategory);
        return services;
    } catch (error) {
        throw new Error('Error fetching main services: ' + error.message);
    }
};




export const getSubServicesByMainServiceIdService = async (mainServiceId) => {
    try {
      const subServices = await getSubServicesByMainServiceId(mainServiceId);
      return subServices;
    } catch (error) {
      throw new Error('Error fetching sub-services: ' + error.message);
    }
  };

  
  
  
// src/services/shopkeeperServices.js
export const saveSelectedServicesService = async (phoneNumber, selectedServices) => {
  try {
      await saveSelectedServices(phoneNumber, selectedServices);
      return { message: 'Selected services saved successfully.' };
  } catch (error) {
      console.error('Error in saveSelectedServicesService:', error);
      throw new Error('Internal server error');
  }
};

  
  
  export const getSelectedMainServicesService = async (phoneNumber) => {
    try {
        const services = await getSelectedMainServicesRepository(phoneNumber);
        return services;
    } catch (error) {
        throw new Error('Error fetching selected main services: ' + error.message);
    }
};


export const getSelectedSubServicesService = async (shopPhoneNumber, mainServiceId) => {
  try {
      const subServices = await getSelectedSubServicesRepository(shopPhoneNumber, mainServiceId);
      return subServices;
  } catch (error) {
      throw new Error('Error fetching selected sub-services: ' + error.message);
  }
};