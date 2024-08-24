// src/services/preferredShopService.js

import { fetchPreferredShopsByCustomerPhoneNumber, addPreferredShop, deletePreferredShop } from '../repositories/preferredShopRepository.js';

// Get preferred shops for a customer
export const getPreferredShopsByCustomerPhoneNumber = async (phoneNumber) => {
  return await fetchPreferredShopsByCustomerPhoneNumber(phoneNumber);
};

// Add a new preferred shop
export const createPreferredShop = async (preferredShopData) => {
  return await addPreferredShop(preferredShopData);
};

// Remove a preferred shop
export const removePreferredShop = async (customerPhoneNumber, shopID) => {
  return await deletePreferredShop(customerPhoneNumber, shopID);
};
