import { Router } from 'express';
import { getCustomerDetailsController } from '../../controllers/customerController.js';

const router = Router();

// Route to get customer details by phone number
router.get('/customerDetails/:phoneNumber', getCustomerDetailsController);

export default router;
