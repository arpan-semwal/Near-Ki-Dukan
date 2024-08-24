import { getShopsInArea, updatePincode, getCustomerPincode, getShopsInPincode, getShopTypeByCategory } from '../repositories/pincodeRepository.js';

// Fetch shops in the area based on pincode
export const getShopsInAreaService = async (pincode) => {
  const shops = await getShopsInArea(pincode);
  return Promise.all(shops.map(async (shop) => {
    const shopTypeResult = await getShopTypeByCategory(shop.selectedCategory);
    return {
      id: shop.id,
      shopkeeperName: shop.shopkeeperName,
      phoneNumber: shop.phoneNumber,
      pincode: shop.pincode,
      shopState: shop.shopState,
      city: shop.city,
      address: shop.address,
      salesAssociateNumber: shop.salesAssociateNumber,
      selectedCategory: shop.selectedCategory,
      selectedSubCategory: shop.selectedSubCategory,
      registrationDate: shop.registrationDate,
      shopID: shop.shopID,
      shopType: shopTypeResult,
      deliverToHome: shop.deliverToHome === 'Yes'
    };
  }));
};

// Update pincode for a customer
export const updatePincodeService = async (phoneNumber, newPincode) => {
  await updatePincode(phoneNumber, newPincode);
};

// Fetch shops in a specific pincode
export const getShopsInPincodeService = async (pincode) => {
  return await getShopsInPincode(pincode);
};

// Get customer's pincode based on phone number
export const getCustomerPincodeService = async (phoneNumber) => {
  return await getCustomerPincode(phoneNumber);
};
