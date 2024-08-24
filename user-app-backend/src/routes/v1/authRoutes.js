import { Router } from 'express';
import { loginController, registerController, checkPhoneNumberController,registerCustomerController  } from '../../controllers/authController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Hi from v1 auth from inside'
    });
});
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/customer', registerCustomerController);
router.post('/check-phone-number', checkPhoneNumberController);

export default router;
