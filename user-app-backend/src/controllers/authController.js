import { loginService, registerService, checkPhoneNumberService,registerCustomerService  } from '../services/authService.js';

export const loginController = async (req, res) => {
    try {
        const { phoneNumber, userType } = req.body;
        const result = await loginService(phoneNumber, userType);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const registerController = async (req, res) => {
    try {
        const userData = req.body;
        const result = await registerService(userData);
        res.json({ success: true, data: result, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in registerController:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};
export const checkPhoneNumberController = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const result = await checkPhoneNumberService(phoneNumber);
        if (result.message.includes('Phone number already exists')) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in checkPhoneNumberController:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const registerCustomerController = async (req, res) => {
    try {
        const { phoneNumber, name, pincode, state, city, address, shopID } = req.body;
        const result = await registerCustomerService(phoneNumber, name, pincode, state, city, address, shopID);
        if (result.status === 'error') {
            return res.status(400).json(result);
        }
        res.status(201).json(result); // 201 Created
        
         
    } catch (error) {
        console.error('Error in registerCustomerController:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};