import { Router } from 'express';
import { getShopkeeperProductsController, deleteProductFromShopkeeperController } from '../../controllers/shopkeeperProductsController.js';

const router = Router();

// Route to fetch shopkeeper's products
router.get('/myProducts/:phoneNumber', getShopkeeperProductsController);

// Route to delete a selected product
router.delete('/deleteProduct', deleteProductFromShopkeeperController);

export default router;
