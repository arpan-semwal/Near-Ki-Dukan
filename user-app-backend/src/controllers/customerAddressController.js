// src/controllers/customerAddressController.js

import { getCustomerAddressService } from '../services/customerAddressService.js';

export const getCustomerAddressController = async (req, res) => {
  const { phoneNumber } = req.query;  // Extract from query string

  try {
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const address = await getCustomerAddressService(phoneNumber);
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found for this phone number' });
    }

    res.json({ success: true, address });
  } catch (error) {
    console.error('Error in getCustomerAddressController:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};
