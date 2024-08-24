// src/services/salesExecutiveService.js

import { checkUserRepository,submitFormRepository,getShopkeeperRepo, getSalesExecutiveRepos, getCommissionRepo, getTblCommissionRepo, updateShopkeeperProfileRepository, checkSalesAssociateRepository, getCommissionByLevelRepository, getUserLevelRepository, getUserLevelAndAddedByRepository, getCommissionAmountRepository, getCommissionAdjustmentRepository, submitTeamMemberRepository, getMyTeamRepository, getProfileRepository, updateProfileRepository, getShopsRepository  } from '../repositories/salesExecutiveRepository.js';
import { AppDataSource } from '../config/data-source.js';
import { uploadImage } from './s3Service.js';
export const checkUserService = async (phoneNumber) => {
  try {
    return await checkUserRepository(phoneNumber);
  } catch (error) {
    throw new Error('Error in checkUserService: ' + error.message);
  }
};

export const submitFormService = async (firstName, lastName, phoneNumber, pincode, commissionLevel) => {
  try {
    return await submitFormRepository(firstName, lastName, phoneNumber, pincode, commissionLevel);
  } catch (error) {
    throw new Error('Error in submitFormService: ' + error.message);
  }
};

  export const submitTeamMemberService = async (teamMemberData) => {
    try {
      console.log(teamMemberData, teamMemberData.addedBy);
      const addedBy = await checkUserRepository(teamMemberData.addedBy); 
      const checkMember = await checkUserRepository(teamMemberData.phoneNumber); 
      if(!addedBy){
        return {error: "addedBy not exists"}
      }
      if(checkMember){
        return {error: "user exists"}
      }
      const newMemberAdded =  await submitTeamMemberRepository(teamMemberData);
      if(newMemberAdded){
        return {message: "Successfully added"}
      }
      return false;
    } catch (error) {
      throw new Error('Error in submitTeamMemberService: ' + error.message);
    }
  };

  export const getMyTeamService = async (phoneNumber) => {
    try {
        const checkUser = await checkUserRepository(phoneNumber); 
        if (!checkUser) return { error: "User does not exist" };

        const team = await getMyTeamRepository(phoneNumber);
        return { message: team };
    } catch (error) {
        throw new Error('Error in getMyTeamService: ' + error.message);
    }
};

  export const getProfileService = async (phoneNumber) => {
    try {
      // const checkUser = await checkUserRepository(phoneNumber); 
      // if (!checkUser) return {error: "user not exists"}
      const data =  await getProfileRepository(phoneNumber);
      if (!data) return {error: "user not exists"}
      return {message: data}
    } catch (error) {
      throw new Error('Error in getProfileService: ' + error.message);
    }
  };

  export const updateProfileService = async (phoneNumber, updates) => {
    try {
      // const checkUser = await checkUserRepository(phoneNumber); 
      // if (!checkUser) return {error: "user not exists"}
      const data =  await updateProfileRepository(phoneNumber, updates);
      if(!data) return {error: "Profile not found"}
      return {message: "Profile updated successfully"}
    } catch (error) {
      throw new Error('Error in updateProfileService: ' + error.message);
    }
  };

  export const getShopsService = async (salesAssociateNumber) => {
    try {
      const data =  await getShopsRepository(salesAssociateNumber);
      if(!(data.length > 0)) return {error: "data not found"}
      return {message: data};
    } catch (error) {
      throw new Error('Error in getShopsService: ' + error.message);
    }
  };
  export const getTotalCommissionService = async (phoneNumber, res) => {
    try {
      const commissionRepo = await getTblCommissionRepo();
      const data = await commissionRepo.findOne({ where: { phoneNumber } });
      if (!data) throw new Error('Not applicable for commission');
  
      const result = await commissionRepo.createQueryBuilder('commission')
        .select('SUM(commission.amount)', 'totalAmount')
        .where('commission.phoneNumber = :phoneNumber', { phoneNumber })
        .getRawOne();
  
      const totalAmount = result.totalAmount;
      return totalAmount;
    } catch (error) {
      throw new Error('Error in getTotalCommissionService: ' + error.message);
    }
  };
  

  export const updateShopkeeperProfileService = async (
    phoneNumber,
    shopkeeperName,
    pincode,
    shopState,
    city,
    address,
    salesAssociateNumber,
    selectedCategory
  ) => {
    try {
      return await updateShopkeeperProfileRepository(
        phoneNumber,
        shopkeeperName,
        pincode,
        shopState,
        city,
        address,
        salesAssociateNumber,
        selectedCategory
      );
    } catch (error) {
      throw new Error('Error in updateShopkeeperProfileService: ' + error.message);
    }
  };          

  export const checkSalesAssociateService = async (number) => {
    try {
      return await checkSalesAssociateRepository(number);
    } catch (error) {
      throw new Error('Error in checkSalesAssociateService: ' + error.message);
    }
  };

  export const getCommissionByLevelService = async (level) => {
    try {
      return await getCommissionByLevelRepository(level);
    } catch (error) {
      throw new Error('Error in getCommissionByLevelService: ' + error.message);
    }
  };

  export const getUserLevelService = async (mobileNumber) => {
    try {
      return await getUserLevelRepository(mobileNumber);
    } catch (error) {
      throw new Error('Error in getUserLevelService: ' + error.message);
    }
  };

  export const calculateTotalCommissionService = async (mobileNumber) => {
    try {
      const user = await getUserLevelAndAddedByRepository(mobileNumber);
      console.log(user, "__-")
      if (!user) {
        return null;
      }
      const { level, addedBy } = user;
      
      if(level === null){
        return {"error": "level is missing"}
      }
      const individualCommission = await getCommissionAmountRepository(level);
  
      if (individualCommission === null) {
        return null;
      }
      console.log("here", individualCommission)
      const adjustment = await getCommissionAdjustmentRepository(addedBy, level);
      console.log(adjustment, "-of-so");
      return adjustment
      const shopCount = await getShopCountRepository(mobileNumber);
  
      let totalCommission = 0;
      let totalL2Commission = 0;
      let totalL1Commission = 0;
  
      if (level === 'L1') {
        totalCommission = individualCommission * shopCount;
      } else if (level === 'L2') {
        totalCommission = (individualCommission + adjustment) * shopCount;
      } else if (level === 'L3') {
        const l3ToL2Adjustment = await getCommissionAdjustmentRepository('L3', 'L2');
        const l2ToL1Adjustment = await getCommissionAdjustmentRepository('L2', 'L1');
  
        totalCommission = (individualCommission + adjustment) * shopCount;
        totalL2Commission = l3ToL2Adjustment * shopCount;
        totalL1Commission = l2ToL1Adjustment * shopCount;
      }
  
      return {
        totalCommission,
        additionalCommissions: {
          totalL2Commission,
          totalL1Commission
        }
      };
    } catch (error) {
      throw new Error('Error in calculateTotalCommissionService: ' + error.message);
    }
  };

  export const registerSalesService = async (shopkeeperData) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();
        // console.log(shopkeeperData)
        if (!shopkeeperData || !shopkeeperData.phoneNumber || !shopkeeperData.salesAssociateNumber) {
            throw new Error("Required fields are missing");
        }

        const salesAssociateRepo = getSalesExecutiveRepos(queryRunner.manager);
        const salesAssociate = await salesAssociateRepo.findOne({ where: { phoneNumber: shopkeeperData.salesAssociateNumber } });
        if (!salesAssociate) {
            throw new Error("Sales Associate number is not valid");
        }

        let key = null;
        if(shopkeeperData.imageData.buffer){
          key = shopkeeperData.imageData.name + Date.now();
          const data = await uploadImageToS3(shopkeeperData.imageData,key);
          if(!data || data.$metadata.httpStatusCode != 200) throw new Error("Error while uploading image to S3")
        }
        const shopkeeperRepo = getShopkeeperRepo(queryRunner.manager);
        delete shopkeeperData.imageData;
        const shopkeeper = shopkeeperRepo.create({
          ...shopkeeperData,
          profilePicture: key
        });
        await shopkeeperRepo.save(shopkeeper);
        await checkAndAssignCommission(shopkeeperData.salesAssociateNumber, queryRunner.manager);

        await queryRunner.commitTransaction();
        return { status: 200, message: "Shopkeeper registered successfully" };
    } catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Error in registerSalesService", error.message);
        throw new Error('Error in registerSalesService: ' + error.message);
    } finally {
        await queryRunner.release();
    }
};

export const checkAndAssignCommission = async (salesAssociateNumber, transactionalEntityManager) => {
    // console.log('Checking and assigning commission for sales associate:', salesAssociateNumber);

    if (!salesAssociateNumber) {
      throw new Error("Sales Associate is missing");
    }

    try {
        const salesAssociateRepo = getSalesExecutiveRepos(transactionalEntityManager);
        const salesAssociate = await salesAssociateRepo.findOne({ where: { phoneNumber: salesAssociateNumber } });
        if (!salesAssociate) {
          throw new Error("Sales Associate number is not valid");
        }

        let addedBy = salesAssociate.addedBy;

        // Fetch commission rates from the database
        const commissionRates = await fetchCommissionRates(transactionalEntityManager);

        // Assign commission to the sales associate
        const commissionAmountBase = commissionRates['L1'];
        await assignCommission(salesAssociateNumber, 'L1', commissionAmountBase, transactionalEntityManager);

        // If the sales associate was added by someone, assign additional commission
        if (addedBy) {
            const commissionAmountL1 = commissionRates['L2'];
            await assignCommission(addedBy, 'L2', commissionAmountL1, transactionalEntityManager);

            // Check if the person who added the sales associate was also added by someone
            const addedBySalesAssociate = await salesAssociateRepo.findOne({ where: { phoneNumber: addedBy } });

            if (addedBySalesAssociate && addedBySalesAssociate.addedBy) {
                const commissionAmountL2 = commissionRates['L3'];
                await assignCommission(addedBySalesAssociate.addedBy, 'L3', commissionAmountL2, transactionalEntityManager);
            } else {
                console.warn(`No further addedBy found for ${addedBy}, skipping L3 commission assignment.`);
            }
        }
    } catch (error) {
        console.error('Error assigning commission:', error);
        throw new Error('Error assigning commission');
    }
};

const assignCommission = async (phoneNumber, commissionType, commissionAmount, transactionalEntityManager) => {
    // console.log('Assigning commission for:', phoneNumber, commissionType, commissionAmount);

    if (!phoneNumber) {
        throw new Error('mobileNumber is null or undefined');
    }

    try {
        const commissionRepo = getTblCommissionRepo(transactionalEntityManager); // Assume you have a Commission entity
        // const existingCommission = await commissionRepo.findOne({ where: { phoneNumber, commissionType } });

        // if (existingCommission) {
        //     existingCommission.amount = parseFloat(commissionAmount).toFixed(2);
        //     await commissionRepo.save(existingCommission);
        // } else {
            const newCommission = commissionRepo.create({
                phoneNumber,
                commissionType,
                amount: parseFloat(commissionAmount).toFixed(2),
            });
            await commissionRepo.save(newCommission);
        // }
    } catch (error) {
        console.error('Error assigning commission:', error);
        throw new Error('Error assigning commission');
    }
};

// Function to fetch commission rates from the commission_rates table
export const fetchCommissionRates = async (transactionalEntityManager) => {
    try {
        // Get repository for the Commission entity
        const commissionRepo = getCommissionRepo(transactionalEntityManager);

        // Fetch all records from the commission_rates table
        const commissions = await commissionRepo.find();

        // Transform the result into an object with level as keys
        const commissionRates = commissions.reduce((acc, cur) => {
            acc[cur.level] = cur.commission_amount;
            return acc;
        }, {});

        return commissionRates;
    } catch (error) {
        console.error('Error fetching commission rates:', error);
        throw new Error('Error fetching commission rates');
    }
};

export const uploadImageToS3 = async(imageData,key) =>{
  // let key;
    if (imageData.buffer) {
      key = key;
      try {
        uploadImage(imageData, key)
          .then(data => {
            return data;
              // res.status(200).send({
              //     message: 'Image uploaded successfully',
              //     data: data
              // });
          })
          .catch(err => {
              throw new Error ("Error while uploading image to S3")
          });
        
      } catch (error) {
        throw new Error (error.message)
      }
    }
}