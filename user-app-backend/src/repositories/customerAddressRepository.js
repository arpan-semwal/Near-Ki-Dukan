// src/repositories/customerAddressRepository.js

import { AppDataSource } from '../config/data-source.js';
import { NewCustomer } from '../entities/NewCustomer.js';

export const getCustomerAddressRepository = async (phoneNumber) => {
  try {
    const customerRepository = AppDataSource.getRepository(NewCustomer);
    const customer = await customerRepository.findOne({
      where: { phoneNumber },
      select: ['address']  // Only select the address field
    });

    return customer ? customer.address : null;
  } catch (error) {
    throw new Error('Error in getCustomerAddressRepository: ' + error.message);
  }
};
