// src/routes/v1/preferredShopRoutes.js

import express from 'express';
import { addPreferredShopController, removePreferredShopController, getPreferredShopsController } from '../../controllers/preferredShopController.js';

const router = express.Router();

// Get preferred shops by customer phone number
router.get('/getPreferredShops/:phoneNumber', getPreferredShopsController);

// Add a new preferred shop
router.post('/addPreferredShop', addPreferredShopController);

// Remove a preferred shop
router.delete('/removePreferredShop', removePreferredShopController);

export default router;
