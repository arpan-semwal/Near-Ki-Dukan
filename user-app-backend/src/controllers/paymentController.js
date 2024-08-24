import {PaymentService} from "../services/paymentService.js"

const paymentService = new PaymentService();

export const initiatePayment =  async (req, res) => {
    try {
      const { amount } = req.body;
      const payment = await paymentService.createPayment(amount);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const verifyPayment = async (req, res) => {
    try {
      const { transactionId } = req.body;
      const payment = await paymentService.verifyPayment(transactionId);
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };