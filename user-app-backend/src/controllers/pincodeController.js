import { getShopsInAreaService, updatePincodeService, getCustomerPincodeService, getShopsInPincodeService } from '../services/pincodeService.js';

// Get shops in the area based on pincode
export const getShopsInAreaController = async (req, res) => {
  const { pincode } = req.params;

  try {
    const shops = await getShopsInAreaService(pincode);

    if (shops.length === 0) {
      return res.status(404).json({ message: 'No shops found for this pincode' });
    }

    res.status(200).json(shops);
  } catch (error) {
    console.error('Error fetching shops in area:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update pincode for a customer
export const updatePincodeController = async (req, res) => {
  const { phoneNumber, newPincode } = req.body;

  try {
    await updatePincodeService(phoneNumber, newPincode);
    res.status(200).json({ message: 'Pincode updated successfully' });
  } catch (error) {
    console.error('Error updating pincode:', error);
    res.status(500).json({ message: 'Error updating pincode', error: error.message });
  }
};

// Fetch shops in a specific pincode
export const getShopsInPincodeController = async (req, res) => {
  const { pincode } = req.params;

  try {
    const shops = await getShopsInPincodeService(pincode);
    res.status(200).json(shops);
  } catch (error) {
    console.error('Error fetching shops in pincode:', error);
    res.status(500).json({ message: 'Error fetching shops in pincode', error: error.message });
  }
};

// Get customer's pincode based on phone number
export const getCustomerPincodeController = async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const { pincode } = await getCustomerPincodeService(phoneNumber);
    res.status(200).json({ pincode });
  } catch (error) {
    console.error('Error fetching customer pincode:', error);
    res.status(500).json({ message: 'Error fetching customer pincode', error: error.message });
  }
};
