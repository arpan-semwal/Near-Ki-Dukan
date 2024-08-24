import { findUserByPhoneNumber, saveUser,saveCustomer, checkPhoneNumberInDatabases } from '../repositories/authRepository.js';
import { AppDataSource } from '../config/data-source.js';
 
import { Category } from '../entities/Category.js';

export const loginService = async (phoneNumber, userType) => {
    if (userType === 'unregistered') {
        // Handle unregistered user case directly
        return { phoneNumber, userType, status: 'unregistered' };
    }

    const user = await findUserByPhoneNumber(phoneNumber, userType);
    if (!user) {
        throw new Error('User not found');
    }

    if (userType === 'shopkeeper') {
        const selectedCategory = user.selectedCategory;

        // Fetch category details
        const categoryRepository = AppDataSource.getRepository(Category);
        const category = await categoryRepository.findOneBy({ name: selectedCategory });

        if (!category) {
            throw new Error('Category not found');
        }

        const shopkeeperType = category.type;

        return { phoneNumber, userType, shopkeeperType, selectedCategory };
    }

    return { phoneNumber, userType };
};


export const registerService = async (userData) => {
    try {
        const user = await saveUser(userData);
        return user;
    } catch (error) {
        throw new Error('Error in registerService: ' + error.message);
    }
};
export const checkPhoneNumberService = async (phoneNumber) => {
    try {
        return await checkPhoneNumberInDatabases(phoneNumber);
    } catch (error) {
        throw new Error('Error in checkPhoneNumberService: ' + error.message);
    }
};



export const registerCustomerService = async (phoneNumber, name, pincode, state, city, address, shopID) => {
    try {
        // Check if the phone number is already registered
        const existingUser = await findUserByPhoneNumber(phoneNumber, 'customer');
        if (existingUser) {
            return { status: 'error', message: 'Phone number already registered' };
        }

        // Check if shopID exists in shopkeepers database
        if (shopID) {
            const shopkeeper = await findUserByPhoneNumber(shopID, 'shopkeeper');
            if (!shopkeeper) {
                return { status: 'error', message: 'ShopID not found' };
            }
        }

        const userData = { phoneNumber, name, pincode, state, city, address, shopID };
        const customer = await saveCustomer(userData);
        return { status: 'success', data: customer, message: 'Customer registered successfully' };
    } catch (error) {
        throw new Error('Error in registerCustomerService: ' + error.message);
    }
};