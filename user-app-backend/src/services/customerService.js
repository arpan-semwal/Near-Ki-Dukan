import { getCustomerDetailsByPhoneNumber as getCustomerDetailsByPhoneNumberRepo } from '../repositories/customerRepository.js';

// Get customer details by phone number
export const getCustomerDetailsByPhoneNumber = async (phoneNumber) => {
    try {
        return await getCustomerDetailsByPhoneNumberRepo(phoneNumber);
    } catch (error) {
        throw new Error('Service error fetching customer details: ' + error.message);
    }
};
