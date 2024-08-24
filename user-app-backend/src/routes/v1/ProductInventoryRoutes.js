// src/routes/v1/ProductInventoryRoutes.js
import { Router } from 'express';
import { getProductsByCategoryController, addProductToShopkeeperController, addMediaProductToShopkeeperController } from '../../controllers/productInventoryController.js';
import { uploadS3 } from '../../utils/helper.js';
const router = Router();

// Route to get products by category
router.get('/products/:category', getProductsByCategoryController);

// Route to add a product to a shopkeeper's list
router.post('/add-product', addProductToShopkeeperController);
router.post('/add-media-product',uploadS3.single('mediaFile'), addMediaProductToShopkeeperController);
export default router;
