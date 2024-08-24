// src/services/shopkeeperDetailsService.js
import {
    getShopkeeperDetailsByPhoneNumber,
    getShopkeeperDetailsByShopID,
    getShopkeeperServiceDetailsByPhoneNumber,
    getShopkeeperProductHomeDetailsByPhoneNumber,
    findShopkeeperByPhoneNumber
} from '../repositories/shopkeeperDetailsRepository.js';

// Get shopkeeper details by phone number
export const getShopkeeperDetailsByPhoneNumberService = async (phoneNumber) => {
    try {
        const shopkeeper = await getShopkeeperDetailsByPhoneNumber(phoneNumber);
        if (shopkeeper) {
            return {
                status: 200,
                success: true,
                data: shopkeeper,
                message: 'Shopkeeper details fetched successfully',
            };
        }
        return {
            status: 404,
            success: false,
            data: null,
            message: 'Shopkeeper not found',
        };
    } catch (error) {
        throw new Error('Error fetching shopkeeper details: ' + error.message);
    }
};

// Get shopkeeper details by shop ID
export const getShopkeeperDetailsByShopIDService = async (shopID) => {
    try {
        const shopkeeper = await getShopkeeperDetailsByShopID(shopID);
        if (shopkeeper) {
            return {
                status: 200,
                success: true,
                data: shopkeeper,
                message: 'Shopkeeper details fetched successfully',
            };
        }
        return {
            status: 404,
            success: false,
            data: null,
            message: 'Shopkeeper not found',
        };
    } catch (error) {
        throw new Error('Error fetching shopkeeper details: ' + error.message);
    }
};

// Get shopkeeper service details by phone number
export const getShopkeeperServiceDetailsByPhoneNumberService = async (phoneNumber) => {
    try {
        const details = await getShopkeeperServiceDetailsByPhoneNumber(phoneNumber);
        if (details) {
            return {
                status: 200,
                success: true,
                data: details,
                message: 'Shopkeeper service details fetched successfully',
            };
        }
        return {
            status: 404,
            success: false,
            data: null,
            message: 'Shopkeeper service details not found',
        };
    } catch (error) {
        throw new Error('Error fetching shopkeeper service details: ' + error.message);
    }
};

// Get shopkeeper product home details by phone number
export const getShopkeeperProductHomeDetailsByPhoneNumberService = async (phoneNumber) => {
    try {
        const details = await getShopkeeperProductHomeDetailsByPhoneNumber(phoneNumber);
        if (details) {
            return {
                status: 200,
                success: true,
                data: details,
                message: 'Shopkeeper product home details fetched successfully',
            };
        }
        return {
            status: 404,
            success: false,
            data: null,
            message: 'Shopkeeper product home details not found',
        };
    } catch (error) {
        console.error('Service Error:', error);  // Debugging statement
        throw new Error('Error fetching shopkeeper product home details: ' + error.message);
    }
};


 

export const getShopkeeperByPhoneNumber = async (phoneNumber) => {
  return await findShopkeeperByPhoneNumber(phoneNumber);
};
