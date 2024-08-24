import { getShopkeeperProducts as getShopkeeperProductsRepo, deleteProductFromShopkeeper as deleteProductFromShopkeeperRepo } from '../repositories/shopkeeperProductsRepository.js';

// Get shopkeeper's products
export const getShopkeeperProducts = async (phoneNumber) => {
    try {
        return await getShopkeeperProductsRepo(phoneNumber);
    } catch (error) {
        throw new Error('Service error fetching selected products: ' + error.message);
    }
};

// Delete a product from a shopkeeper's list
export const deleteProductFromShopkeeper = async (phoneNumber, productId) => {
    try {
        return await deleteProductFromShopkeeperRepo(phoneNumber, productId);
    } catch (error) {
        throw new Error('Service error deleting product from shopkeeper\'s list: ' + error.message);
    }
};
