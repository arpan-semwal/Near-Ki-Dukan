// src/routes/v1/mainServiceRoutes.js
import { Router } from 'express';
import {getMainServicesBySubCategory,getSubServicesByMainServiceId,saveSelectedServicesController,getSelectedMainServices,getSelectedSubServicesController   } from '../../controllers/shopkeeperServicesController.js';
 


const router = Router();

router.get('/mainServices/:selectedSubCategory', getMainServicesBySubCategory);
router.get('/subServices/:mainServiceId', getSubServicesByMainServiceId);
router.post('/saveSelectedServices', saveSelectedServicesController);
router.get('/selectedMainServices/:phoneNumber', getSelectedMainServices);
router.get('/selectedSubServices/:shopPhoneNumber/:mainServiceId', getSelectedSubServicesController); // Add the new route
export default router;
