import {
    getShopkeeperDetailsByPhoneNumberService,
    getShopkeeperDetailsByShopIDService,
    getShopkeeperServiceDetailsByPhoneNumberService,
    getShopkeeperProductHomeDetailsByPhoneNumberService,
    getShopkeeperByPhoneNumber 
} from '../services/shopkeeperDetailsService.js';

// Get shopkeeper details by phone number
export const getShopkeeperDetailsByPhoneNumberController = async (req, res) => {
    try {
        const { phoneNumber } = req.query;
        const result = await getShopkeeperDetailsByPhoneNumberService(phoneNumber);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper details by phone number',
            error: error.message,
        });
    }
};

// Get shopkeeper details by shop ID
export const getShopkeeperDetailsByShopIDController = async (req, res) => {
    try {
        const { shopID } = req.query;
        const result = await getShopkeeperDetailsByShopIDService(shopID);
        res.status(result.status).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper details by shop ID',
            error: error.message,
        });
    }
};

// Get shopkeeper service details
export const getShopkeeperServiceDetailsController = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        console.log(`Received phoneNumber: ${phoneNumber}`);  // Debugging statement
        const result = await getShopkeeperServiceDetailsByPhoneNumberService(phoneNumber);
        console.log('Service Result:', result);  // Debugging statement
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Controller Error:', error);  // Debugging statement
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper service details',
            error: error.message,
        });
    }
};
// Get shopkeeper product home details
export const getShopkeeperProductHomeDetailsController = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        console.log(`Received phoneNumber: ${phoneNumber}`);  // Debugging statement
        const result = await getShopkeeperProductHomeDetailsByPhoneNumberService(phoneNumber);
        console.log('Service Result:', result);  // Debugging statement
        res.status(result.status).json(result);
    } catch (error) {
        console.error('Controller Error:', error);  // Debugging statement
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching shopkeeper product home details',
            error: error.message,
        });
    }
};


export const getShopkeeper = async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
  
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
  
    try {
      const shopkeeper = await getShopkeeperByPhoneNumber(phoneNumber);
      if (!shopkeeper) {
        return res.status(404).json({ error: 'Shopkeeper not found' });
      }
      res.json(shopkeeper);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error.message });
    }
  };