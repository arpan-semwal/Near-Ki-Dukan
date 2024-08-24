import express from 'express';
import {
  getShopsInAreaController,
  updatePincodeController,
  getCustomerPincodeController,
  getShopsInPincodeController
} from '../../controllers/pincodeController.js';

const router = express.Router();

// Get shops in the area based on pincode
router.get('/shopsInArea/:pincode', getShopsInAreaController);

// Update pincode for a customer
router.put('/updatePincode', updatePincodeController);

// Fetch shops in a specific pincode
router.get('/shopsInPincode/:pincode', getShopsInPincodeController);

// Get customer's pincode based on phone number
router.get('/customerPincode/:phoneNumber', getCustomerPincodeController);

export default router;
