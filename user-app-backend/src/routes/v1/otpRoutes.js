import { Router } from 'express';
import { generateOtpController, validateOtpController } from '../../controllers/otpController.js';
import { authenticateToken } from '../../middleware/authenticateToken.js';
const router = Router();

router.post('/generate-otp', generateOtpController);
router.post('/validate-otp', validateOtpController);

router.get('/',authenticateToken, (req, res) => {
    res.json({
      message: 'Hi from v1 otp from inside',
    });
  });
  

export default router;
