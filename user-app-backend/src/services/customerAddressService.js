// src/services/customerAddressService.js

import { getCustomerAddressRepository } from '../repositories/customerAddressRepository.js';

export const getCustomerAddressService = async (phoneNumber) => {
  try {
    return await getCustomerAddressRepository(phoneNumber);
  } catch (error) {
    throw new Error('Error in getCustomerAddressService: ' + error.message);
  }
};
