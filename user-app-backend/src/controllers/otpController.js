import { generateOtp, validateOtp } from '../services/otpService.js';
import { BadRequestError } from '../utils/errorHandlers.js';

export const generateOtpController = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!req.body) throw new BadRequestError('Request body is missing.');
    if (!phoneNumber) throw new BadRequestError('phone number is required.');
    const result = await generateOtp(phoneNumber);
    res.json(result);
  } catch (error) {
    console.log('Error: ', error);
    res.status(error.statusCode || 500).json({
      success: false,
      data: null,
      message: error.message || 'Error while generating otp',
      error: error.message,
    });
  }
};

export const validateOtpController = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    if (!req.body) throw new BadRequestError('Request body is missing.');
    if (!phoneNumber) throw new BadRequestError('phone number is required.');
    if (!otp) throw new BadRequestError('otp is required.');
    const result = await validateOtp(phoneNumber, otp);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      data: null,
      message: error.message || 'Error while validating otp',
      error: error.message,
    });
  }
};
