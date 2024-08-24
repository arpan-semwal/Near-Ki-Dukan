// src/routes/v1/salesExecutiveRoutes.js

import { Router } from 'express';
import { calculateTotalCommissionController, checkSalesAssociateController, checkUserController ,getCommissionByLevelController,getMyTeamController,getProfileController,getShopsController,getTotalCommissionController,getUserLevelController,registerSalesController,submitFormController, submitTeamMemberController, updateProfileController, updateShopkeeperProfileController } from '../../controllers/salesExecutiveController.js';
import { uploadS3 } from '../../utils/helper.js';
const router = Router();

router.post('/check-user', checkUserController);  // Route to check if user exists
router.post('/submit-form', submitFormController); // Route to submit the form
router.post('/submit-team-member', submitTeamMemberController);//team member add
router.get('/my-team/:phoneNumber', getMyTeamController); //info about team member
router.get('/my-profile/:phoneNumber', getProfileController); //profile
router.post('/update-profile', updateProfileController); // Route to update user's profile
router.get('/shops', getShopsController); // Route to update user's profile

router.get('/my-total-commission', getTotalCommissionController);// Endpoint to retrieve total commission for a specific mobile number
router.put('/update-profile/:phoneNumber', updateShopkeeperProfileController); //update shopkeeper
router.get('/check-sales-associate/:phoneNumber', checkSalesAssociateController); // Example route for checking sales associate number
router.get('/commission/:level', getCommissionByLevelController); // Example route for checking sales associate number
router.get('/user-level/:phoneNumber', getUserLevelController); // Example route for checking sales associate number

router.post('/register-sales', uploadS3.single('image'), registerSalesController); // Route to submit the form
// depreciated
router.get('/total-commission/:mobileNumber', calculateTotalCommissionController); // Example route for checking sales associate number

export default router;
