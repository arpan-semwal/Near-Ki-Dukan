// src/services/customerOrdersService.js

import { saveOrderRepository, placeOrderRepository, getOrdersRepository, getCustomerOrdersRepository, getOrderDetailsRepository, getCustomerStoresRepository } from '../repositories/customerOrdersRepository.js';

export const saveOrderService = async (custName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, shopkeeperPhoneNumber) => {
	try {
	  // Set default values for selectedDate and selectedTime if they are undefined
	  const date = selectedDate || new Date();  // Default to current date if not provided
	  const time = selectedTime || '00:00';  // Default to midnight if not provided
  
	  return await saveOrderRepository(custName, custPhoneNumber, cartItems, totalPrice, date, time, shopID, shopkeeperName, shopkeeperPhoneNumber);
	} catch (error) {
	  throw new Error('Error in saveOrderService: ' + error.message);
	}
  };

export const placeOrderService = async (custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, customerName, shopkeeperPhoneNumber) => {
  try {
    const data  = await placeOrderRepository(custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, customerName, shopkeeperPhoneNumber);
    return data
  } catch (error) {
    throw new Error('Error in placeOrderService: ' + error.message);
  }
};

export const getOrdersService = async (custPhoneNumber) => {
  try {
    return await getOrdersRepository(custPhoneNumber);
  } catch (error) {
    throw new Error('Error in getOrdersService: ' + error.message);
  }
};

export const getCustomerOrdersService = async (custPhoneNumber) => {
	try {
	  return await getCustomerOrdersRepository(custPhoneNumber);
	} catch (error) {
	  throw new Error('Error in getCustomerOrdersService: ' + error.message);
	}
  };

  export const getOrderDetailsService = async (shopID, custPhoneNumber) => {
	try {
	  return await getOrderDetailsRepository(shopID, custPhoneNumber);  // Call repository
	} catch (error) {
	  throw new Error('Error in getOrderDetailsService: ' + error.message);  // Handle error
	}
  };
  

export const getCustomerStoresService = async (custPhoneNumber) => {
  try {
    return await getCustomerStoresRepository(custPhoneNumber);
  } catch (error) {
    throw new Error('Error in getCustomerStoresService: ' + error.message);
  }
};
