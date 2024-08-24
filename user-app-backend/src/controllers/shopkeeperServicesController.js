// src/controllers/mainServiceController.js
import { getMainServicesBySubCategoryService } from '../services/shopkeeperServices.js';
import { getSubServicesByMainServiceIdService,getSelectedMainServicesService ,saveSelectedServicesService,getSelectedSubServicesService  } from '../services/shopkeeperServices.js';


export const getMainServicesBySubCategory = async (req, res) => {
    const { selectedSubCategory } = req.params;
    try {
        const services = await getMainServicesBySubCategoryService(selectedSubCategory);
        res.status(200).json({
            success: true,
            data: services,
            message: 'Main services fetched successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: error.message
        });
    }
};



export const getSubServicesByMainServiceId = async (req, res) => {
    const { mainServiceId } = req.params;
    try {
      const subServices = await getSubServicesByMainServiceIdService(mainServiceId);
      res.status(200).json({
        success: true,
        data: subServices,
        message: 'Sub-services fetched successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: 'Internal server error',
        error: error.message
      });
    }
  };
  
 
  export const saveSelectedServicesController = async (req, res) => {
    const { phoneNumber, selectedServices } = req.body;

    try {
        const result = await saveSelectedServicesService(phoneNumber, selectedServices);
        res.status(200).json({
            success: true,
            data: result,
            message: 'Selected services saved successfully'
        });
    } catch (error) {
        console.error('Error in saveSelectedServicesController:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: error.message
        });
    }
};

  
  
  export const getSelectedMainServices = async (req, res) => {
    const { phoneNumber } = req.params;
    try {
        const services = await getSelectedMainServicesService(phoneNumber);
        res.status(200).json({
          success:true,
          data:services,
          message:"selected services saved succesfully"
        
        
        });
    } catch (error) {
        console.error('Error fetching selected main services:', error);
        res.status(500).json({
          success:false, 
          data:null,
          message: 'Internal server error', 
          error: error.message 
        });
    }
};



export const getSelectedSubServicesController = async (req, res) => {
  const { shopPhoneNumber, mainServiceId } = req.params;
  try {
      const subServices = await getSelectedSubServicesService(shopPhoneNumber, mainServiceId);
      res.status(200).json({
          success: true,
          data: subServices,
          message: 'Selected sub-services fetched successfully'
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          data: null,
          message: 'Internal server error',
          error: error.message
      });
  }
};