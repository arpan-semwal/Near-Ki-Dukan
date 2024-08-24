import { calculateTotalCommissionService, checkSalesAssociateService, checkUserService, getCommissionByLevelService, getMyTeamService, getProfileService, getShopsService, getTotalCommissionService, getUserLevelService, submitTeamMemberService, updateProfileService, updateShopkeeperProfileService } from '../services/salesExecutiveService.js';
import { submitFormService , registerSalesService} from '../services/salesExecutiveService.js';
import { uploadImage } from '../services/s3Service.js';
export const checkUserController = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const userExists = await checkUserService(phoneNumber);
    res.json({ exists: userExists });
  } catch (error) {
    console.error('Error in checkUserController:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};


export const submitFormController = async (req, res) => {
  const { firstName, lastName, phoneNumber, pincode } = req.body;
  const commissionLevel = 'L0';

  try {
    if (!firstName || !lastName || !phoneNumber || !pincode) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const result = await submitFormService(firstName, lastName, phoneNumber, pincode, commissionLevel);
    res.json({ success: result });
  } catch (error) {
    console.error('Error in submitFormController:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};


  export const submitTeamMemberController = async (req, res) => {
    const { phoneNumber, firstName, lastName, pincode, aadhar, upi, pancard, addedBy } = req.body;
    
    // New team members should be assigned level base by default
    const level = 'L1';
  
    try {
      if (!phoneNumber || !firstName  || !pincode || !addedBy) {
        console.log(phoneNumber, firstName, lastName, pincode, addedBy,'---')
        return res.status(400).json({ error: 'All required fields must be provided' });
      }
  
      const result = await submitTeamMemberService({ phoneNumber, firstName, lastName, pincode, aadhar, upi, pancard, addedBy, level });
  
      if (result?.message) {
        res.json({ success: true, message: result.message });
      }else if (result?.error){
        return res.status(400).json({ success: false, error: result.error });
      } else {
        res.status(400).json({success: false, error: 'Failed to add team member' });
      }
    } catch (error) {
      console.error('Error submitting team member:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const getMyTeamController = async (req, res) => {
    const { phoneNumber } = req.params;
    try {
        const teamMembers = await getMyTeamService(phoneNumber);

        if (teamMembers && teamMembers.message && teamMembers.message.length > 0) {
            res.json({ success: true, message: teamMembers.message });
        } else if (teamMembers && teamMembers.message && teamMembers.message.length === 0) {
            return res.status(404).json({ success: false, message: [] });
        } else if (teamMembers?.error) {
            return res.status(400).json({ success: false, error: teamMembers.error });
        } else {
            res.status(400).json({ success: false, error: 'Failed to check team members' });
        }
    } catch (error) {
        console.error('Error fetching team data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  export const getProfileController = async (req, res) => {
    const { phoneNumber } = req.params;

    try {
      const result = await getProfileService(phoneNumber);

      if (result && result.message) {
        res.json({ success: true, message: result.message });
      } 
      else if (result && result.error){
        return res.status(400).json({ success: false, error: result.error });
      } else {
        res.status(400).json({success: false, error: 'Failed to get user Profile' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Error fetching profile' });
    }
  };

  export const updateProfileController = async (req, res) => {
    const { phoneNumber, firstName, lastName, pincode, aadhar, upi, pancard } = req.body;
  
    try {
      const result = await updateProfileService(phoneNumber, { firstName, lastName, pincode, aadhar, upi, pancard });
  
      if (result && result.message) {
        res.json({ success: true, message: result.message });
      } 
      else if (result && result.error){
        return res.status(400).json({ success: false, error: result.error });
      } else {
        res.status(400).json({success: false, error: 'Failed to get user Profile' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  };


  export const getShopsController = async (req, res) => {
    const { salesAssociateNumber } = req.query;

    try {
      const result = await getShopsService(salesAssociateNumber);
      
      if (result && result.message) {
        res.json({ success: true, message: result.message });
      } 
      else if (result && result.error){
        return res.status(400).json({ success: false, error: result.error });
      } else {
        res.status(400).json({success: false, error: 'Failed to get user Profile' });
      }
      // res.status(200).json(shops);
    } catch (error) {
      console.error('Error fetching shops:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getTotalCommissionController = async (req, res) => {
    const { phoneNumber } = req.query;
  
    try {
      if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
      }
  
      const totalCommission = await getTotalCommissionService(phoneNumber, res);
      res.status(200).json({ totalCommission });
    } catch (error) {
      console.error('Error retrieving total commission:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const updateShopkeeperProfileController = async (req, res) => {
    const { phoneNumber } = req.params;
    const {
      shopkeeperName,
      pincode,
      shopState,
      city,
      address,
      salesAssociateNumber,
      selectedCategory
    } = req.body;
  
    try {
      if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
      }
  
      const result = await updateShopkeeperProfileService(
        phoneNumber,
        shopkeeperName,
        pincode,
        shopState,
        city,
        address,
        salesAssociateNumber,
        selectedCategory
      );
  
      if (!result) {
        return res.status(404).json({ message: 'Shopkeeper not found' });
      }
  
      res.json({ message: 'Shopkeeper profile updated successfully' });
    } catch (error) {
      console.error('Error updating shopkeeper profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const checkSalesAssociateController = async (req, res) => {
    const { phoneNumber } = req.params;
  
    try {
      if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Sales associate number is required' });
      }
  
      const exists = await checkSalesAssociateService(phoneNumber);
      res.status(200).json({ exists });
    } catch (error) {
      console.error('Error checking sales associate existence:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getCommissionByLevelController = async (req, res) => {
    const { level } = req.params;
    try {
      if (!level) {
        return res.status(400).json({ success: false, error: 'Level parameter is required' });
      }
  
      const commission = await getCommissionByLevelService(level);
  
      if (commission === null) {
        return res.status(404).json({ success: false, error: 'Commission data not found' });
      }
  
      res.json({ success: true, commission });
    } catch (error) {
      console.error('Error fetching commission:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };

  export const getUserLevelController = async (req, res) => {
    const { mobileNumber } = req.params;
    console.log(mobileNumber, "000")
    try {
      if (!mobileNumber) {
        return res.status(400).json({ error: 'Mobile number is required' });
      }
  
      const level = await getUserLevelService(mobileNumber);
      console.log(level, "==")
      if (level === null) {
        return res.status(404).json({ error: 'No Level found' });
      }else if(level === false){
        return res.status(404).json({ error: 'No user found' });
      }
  
      res.json({ level });
    } catch (error) {
      console.error('Error fetching user level:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const calculateTotalCommissionController = async (req, res) => {
    const { mobileNumber } = req.params;
  
    try {
      if (!mobileNumber) {
        return res.status(400).json({ error: 'Mobile number is required' });
      }
  
      const commissionData = await calculateTotalCommissionService(mobileNumber);
  
      if (commissionData === null) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(commissionData);
    } catch (error) {
      console.error('Error calculating total commission:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  export const registerSalesController = async (req, res) => {
    const {
        phoneNumber,
        shopkeeperName,
        shopID,
        pincode,
        shopState,
        city,
        address,
        salesAssociateNumber,
        selectedCategory,
        selectedSubCategory,
    } = req.body;

    const imageData = {
        name: "",
        buffer: "",
        mimetype: ""
    };
    if (req.file) {
        imageData.name = req.file.originalname;
        imageData.buffer = req.file.buffer;
        imageData.mimetype = req.file.mimetype;
    }

    try {
        const result = await registerSalesService({
            phoneNumber,
            shopkeeperName,
            shopID,
            pincode,
            shopState,
            city,
            address,
            salesAssociateNumber,
            selectedCategory,
            selectedSubCategory,
            imageData, // Ensure imageData is included, even if it's empty
        });

        res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error('Error registering shopkeeper:', error.message);
        res.status(500).json({ message: error.message });
    }
};



  // export const registerSalesController = async (req, res) => {
  //   const {
  //     phoneNumber,
  //     shopkeeperName,
  //     shopID,
  //     pincode,
  //     shopState,
  //     city,
  //     address,
  //     salesAssociateNumber,
  //     selectedCategory,
  //     selectedSubCategory,
  //   } = req.body;

  //   if (!req.file) { return res.status(500).send({message: 'No image found',})};
  //   console.log("jere")
  //   const imageBuffer = req.file.buffer;
  //   // let key;
  //   // if (req.file) {
  //   //   key = req.file.originalname + Date.now();
  //   //   const fileBuffer = req.file.buffer; 
  //   //   uploadImage(req.file, key)
  //   //     .then(data => {
  //   //         // res.status(200).send({
  //   //         //     message: 'Image uploaded successfully',
  //   //         //     data: data
  //   //         // });
  //   //     })
  //   //     .catch(err => {
  //   //         res.status(500).send({
  //   //             message: 'Error uploading image',
  //   //             error: err.message
  //   //         });
  //   //         return;
  //   //     });
  //   // }
  //   // console.log("here");
    
  //   try {
  //     const message = await registerSalesService({
  //       phoneNumber,
  //       shopkeeperName,
  //       shopID,
  //       pincode,
  //       shopState,
  //       city,
  //       address,
  //       salesAssociateNumber,
  //       selectedCategory,
  //       selectedSubCategory,
  //       imageBuffer,
  //     });
  
  //     res.status(200).json({ message: 'Shopkeeper registered successfully' });
  //   } catch (error) {
  //     console.error('Error registering shopkeeper:', error.message);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // };