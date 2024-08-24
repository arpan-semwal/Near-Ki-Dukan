import { Router } from 'express';
import { initiatePayment, verifyPayment } from '../../controllers/paymentController.js';

const router = Router();

router.post("/initiate", initiatePayment);
router.post("/verify", verifyPayment);
router.get('/', (req, res) => {
    res.json({
      message: 'Hi from v1 payment from inside',
    });
  });
  

export default router; 