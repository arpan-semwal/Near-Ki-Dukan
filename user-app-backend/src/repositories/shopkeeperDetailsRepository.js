// src/repositories/shopkeeperDetailsRepository.js
import { AppDataSource } from '../config/data-source.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';

// Get shopkeeper details by phone number
export const getShopkeeperDetailsByPhoneNumber = async (phoneNumber) => {
    const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
    return await shopkeeperRepo.findOneBy({ phoneNumber });
};

// Get shopkeeper details by shop ID
export const getShopkeeperDetailsByShopID = async (shopID) => {
    const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
    return await shopkeeperRepo.findOneBy({ shopID });
};

// Get shopkeeper service details by phone number
export const getShopkeeperServiceDetailsByPhoneNumber = async (phoneNumber) => {
    const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
    return await shopkeeperRepo.findOneBy({ phoneNumber });
};

export const getShopkeeperProductHomeDetailsByPhoneNumber = async (phoneNumber) => {
    const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
    return await shopkeeperRepo.findOne({
        where: { phoneNumber },
        select: ['shopkeeperName', 'shopID', 'pincode', 'shopState', 'city', 'address', 'salesAssociateNumber', 'selectedCategory', 'selectedSubCategory'],
    });
};
const shopkeeperRepository = AppDataSource.getRepository(Shopkeeper);
export const findShopkeeperByPhoneNumber = async (phoneNumber) => {
    return await shopkeeperRepository.findOneBy({ phoneNumber });
  };