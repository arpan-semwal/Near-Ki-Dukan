import { AppDataSource } from '../config/data-source.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';
import { NewCustomer } from '../entities/NewCustomer.js';
import { Category } from '../entities/Category.js';

// Fetch shops in the area based on pincode
export const getShopsInArea = async (pincode) => {
  return await AppDataSource.getRepository(Shopkeeper).find({ where: { pincode } });
};

// Update pincode for a customer
export const updatePincode = async (phoneNumber, newPincode) => {
  await AppDataSource.getRepository(NewCustomer).update({ phoneNumber }, { pincode: newPincode });
};

// Fetch shops in a specific pincode
export const getShopsInPincode = async (pincode) => {
  return await AppDataSource.getRepository(Shopkeeper).find({ where: { pincode } });
};

// Get customer's pincode based on phone number
export const getCustomerPincode = async (phoneNumber) => {
  const result = await AppDataSource.getRepository(NewCustomer).findOneBy({ phoneNumber });
  return { pincode: result.pincode };
};

// Get shop type by category
export const getShopTypeByCategory = async (categoryName) => {
  const category = await AppDataSource.getRepository(Category).findOne({
    where: { name: categoryName },
    select: ['type'],
  });
  return category ? category.type : 'unknown';
};
