import { AppDataSource } from '../config/data-source.js';
import { NewCustomer } from '../entities/NewCustomer.js';

// Fetch customer details by phone number
export const getCustomerDetailsByPhoneNumber = async (phoneNumber) => {
    try {
        const customerRepository = AppDataSource.getRepository(NewCustomer);
        const customer = await customerRepository.findOne({
            where: {
                phoneNumber: phoneNumber
            },
            select: ['name', 'pincode', 'shop_id']
        });
        return customer;
    } catch (error) {
        throw new Error('Error fetching customer details by phone number: ' + error.message);
    }
};
