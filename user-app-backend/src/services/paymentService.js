
import { paymentRepository } from '../repositories/paymentRepository.js';
import { paymentDetailRepository } from '../repositories/paymentDetailRepository.js';

// import PhonePeProvider from "../providers/PhonePeProvider"


export class PaymentService {
  async createPayment(amount) {
    const payment = paymentRepository.create({ amount, status: "INITIATED" });
    await paymentRepository.save(payment);

    const provider = new PhonePeProvider();
    const providerResponse = await provider.initiatePayment(payment.id, amount);

    const paymentDetail = paymentDetailRepository.create({
      provider: "PhonePe",
      providerTransactionId: providerResponse.transactionId,
      payment,
    });
    await paymentDetailRepository.save(paymentDetail);

    return {
      transactionId: providerResponse.transactionId,
      token: providerResponse.token,
    };
  }

  async verifyPayment(transactionId) {
    const paymentDetail = await paymentDetailRepository.findOne({ providerTransactionId: transactionId });
    if (!paymentDetail) throw new Error("Payment not found");

    const provider = new PhonePeProvider();
    const providerResponse = await provider.verifyPayment(transactionId);

    const payment = paymentDetail.payment;
    payment.status = providerResponse.status;
    await paymentRepository.save(payment);

    return payment;
  }
}
