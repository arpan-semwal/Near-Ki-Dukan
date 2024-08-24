// src/routes/v1/index.js

import { Router } from 'express';
import {
  saveOrderController,
  placeOrderController,
  getOrdersController,
  getCustomerOrdersController,
  getOrderDetailsController,
  getCustomerStoresController
} from '../../controllers/customerOrdersController.js';

const router = Router();

router.post('/saveOrder', saveOrderController);
router.post('/placeOrder', placeOrderController);
router.get('/getOrders', getOrdersController);
router.get('/getCustomerOrder/:phoneNumber', getCustomerOrdersController);
router.get('/getOrderDetails/:shopID/:custPhoneNumber', getOrderDetailsController); 
router.get('/getCustomerStores', getCustomerStoresController);

export default router;
