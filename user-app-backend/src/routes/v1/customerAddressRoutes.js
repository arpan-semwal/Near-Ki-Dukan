// src/routes/v1/customerAddressRoutes.js

import { Router } from 'express';
import {
  getCustomerAddressController  // Import the new controller function
} from '../../controllers/customerAddressController.js';

const router = Router();

router.get('/customer/address', getCustomerAddressController);  // Define the new route

export default router;
