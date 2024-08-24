import { Router } from 'express';
import authRoutes from './authRoutes.js';
import otpRoutes from './otpRoutes.js';
import paymentRoutes from './paymentRoutes.js'

import categoryRoutes from "./categoryRoutes.js"
import productInventoryRoutes from './ProductInventoryRoutes.js';
import customerRoutes from './customerRoutes.js';
import shopkeeperDetailsRoutes from './shopkeeperDetailsRoutes.js';
import preferredShopRoutes from './preferredShopRoutes.js'; // Import the shopkeeperDetailsRoutes
import pincodeRoutes from "./pincodeRoutes.js";
import shopkeeperProductsRoutes from './shopkeeperProductsRoutes.js'; 
import customerOrdersRoutes from "./customerOrdersRoutes.js"
import customerAddressRoutes from "./customerAddressRoutes.js";
import salesExecutiveRoutes from "./salesExecutiveRoutes.js"
import shopkeeperServicesRoutes from "./shopkeeperServicesRoutes.js"
 
const router = Router();

router.use('/auth', authRoutes);
router.use('/otp',otpRoutes);
router.use('/payment',paymentRoutes);
router.use('/category', categoryRoutes);
router.use('/productInventory', productInventoryRoutes);
router.use('/customer', customerRoutes);
router.use('/shopkeeper', shopkeeperDetailsRoutes);
router.use('/pincode', pincodeRoutes); // Use the pincode routes
router.use('/preferredShops', preferredShopRoutes);
router.use('/shopkeeperDetails', shopkeeperDetailsRoutes); 
router.use('/shopkeeperProducts', shopkeeperProductsRoutes);
router.use('/customerOrders', customerOrdersRoutes);
router.use('/customerAddress', customerAddressRoutes);
router.use('/sales', salesExecutiveRoutes);
router.use('/services', shopkeeperServicesRoutes);


export default router;
