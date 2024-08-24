// src/repositories/preferredShopRepository.js

import { AppDataSource } from '../config/data-source.js';
import { PreferredShops } from '../entities/PreferredShops.js';

// Fetch preferred shops by customer phone number
export const fetchPreferredShopsByCustomerPhoneNumber = async (phoneNumber) => {
  const repository = AppDataSource.getRepository(PreferredShops);
  return await repository.find({ where: { customerPhoneNumber: phoneNumber } });
};

// Add a new preferred shop
export const addPreferredShop = async (preferredShop) => {
  const repository = AppDataSource.getRepository(PreferredShops);
  return await repository.save(preferredShop);
};

// Remove a preferred shop
export const deletePreferredShop = async (customerPhoneNumber, shopID) => {
  const repository = AppDataSource.getRepository(PreferredShops);
  return await repository.delete({ customerPhoneNumber, shopID });
};
