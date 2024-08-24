import { AppDataSource } from '../config/data-source.js';
import { Payment} from '../entities/Payment.js';

export const paymentRepository = async (paymentDetailData) => {
    const repository = AppDataSource.getRepository(Payment);
    return repository;
  };