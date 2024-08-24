import { AppDataSource } from '../config/data-source.js';
import {Otp} from '../entities/Otp.js';
import { Commission } from '../entities/Commission.js';

export const savecommision = async (otpData) => {
  const repository = AppDataSource.getRepository(Commission);
  return await repository.save(otpData);
};
export const saveOtp = async (otpData) => {
  const repository = AppDataSource.getRepository(Otp);
  return await repository.save(otpData);
};

export const findOtpByPhoneNumber = async (phoneNumber) => {
  const repository = AppDataSource.getRepository(Otp);
  // return await repository.findOne({ phoneNumber });
  return await repository.findOne({ where: { phoneNumber } });
};

export const removeOtp = async (otpData) => {
  const repository = AppDataSource.getRepository(Otp);
  // return await repository.remove(otpData);
  try {
    const result = await repository.remove(otpData);
    return result;
  } catch (error) {
    console.error('Error removing OTP:', error);
    throw new Error('Could not remove OTP');
  }
};

