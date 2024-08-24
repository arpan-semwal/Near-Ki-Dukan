// import { AppDataSource } from "../config/data-source";
// import { PaymentDetail } from "../entities/PaymentDetail";

export const paymentDetailRepository = () => {
    const repository = AppDataSource.getRepository(PaymentDetail);
    return repository;
}