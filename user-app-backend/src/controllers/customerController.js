import { getCustomerDetailsByPhoneNumber } from '../services/customerService.js';

// Fetch customer details by phone number
export const getCustomerDetailsController = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const customer = await getCustomerDetailsByPhoneNumber(phoneNumber);
        if (!customer) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'No customer found for this phone number'
            });
        }
        res.status(200).json({
            success: true,
            data: customer,
            message: 'Customer details fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching customer details:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error',
            error: error.message
        });
    }
};
