// src/controllers/preferredShopController.js

import { createPreferredShop, removePreferredShop, getPreferredShopsByCustomerPhoneNumber } from '../services/preferredShopService.js';

// Get preferred shops by customer phone number
export const getPreferredShopsController = async (req, res) => {
  const { phoneNumber } = req.params;
  try {
    const shops = await getPreferredShopsByCustomerPhoneNumber(phoneNumber);
    res.status(200).json({ success: true, data: shops, message: 'Preferred shops fetched successfully' });
  } catch (error) {
    console.error('Error fetching preferred shops:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch preferred shops' });
  }
};

// Add a new preferred shop
export const addPreferredShopController = async (req, res) => {
  const { customerPhoneNumber, shopID, shopkeeperName, phoneNumber, selectedCategory, shopType, pincode, deliverToHome } = req.body;
  const preferredShopData = { customerPhoneNumber, shopID, shopkeeperName, phoneNumber, selectedCategory, shopType, pincode, deliverToHome };

  try {
    await createPreferredShop(preferredShopData);
    res.status(200).json({ success: true, message: 'Preferred shop added successfully' });
  } catch (error) {
    console.error('Error adding preferred shop:', error);
    res.status(500).json({ success: false, message: 'Failed to add preferred shop' });
  }
};

// Remove a preferred shop
export const removePreferredShopController = async (req, res) => {
  const { customerPhoneNumber, shopID } = req.body;
  try {
    await removePreferredShop(customerPhoneNumber, shopID);
    res.status(200).json({ success: true, message: 'Preferred shop removed successfully' });
  } catch (error) {
    console.error('Error removing preferred shop:', error);
    res.status(500).json({ success: false, message: 'Failed to remove preferred shop' });
  }
};
