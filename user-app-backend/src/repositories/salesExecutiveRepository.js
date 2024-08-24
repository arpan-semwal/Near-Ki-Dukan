import { AppDataSource } from '../config/data-source.js';
import { TblSalesExecutives } from '../entities/TblSalesExecutives.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';
import { Commission } from '../entities/Commission.js';
import { TblCommission } from '../entities/TblCommission.js';
import { CommissionLevel } from '../entities/CommissionLevel.js';


export const getShopkeeperRepo = (transactionalEntityManager) => {
    return transactionalEntityManager ? transactionalEntityManager.getRepository(Shopkeeper) : AppDataSource.getRepository(Shopkeeper);
};

export const getCommissionRepo = (transactionalEntityManager) => {
    return transactionalEntityManager ? transactionalEntityManager.getRepository(Commission) : AppDataSource.getRepository(Commission);
};

export const getTblCommissionRepo = (transactionalEntityManager) => {
    return transactionalEntityManager ? transactionalEntityManager.getRepository(TblCommission) : AppDataSource.getRepository(TblCommission);
};

export const getSalesExecutiveRepos = (transactionalEntityManager) => {
    return transactionalEntityManager ? transactionalEntityManager.getRepository(TblSalesExecutives) : AppDataSource.getRepository(TblSalesExecutives);
};

export const checkUserRepository = async (phoneNumber) => {
    try {
        const salesExecutiveRepository = AppDataSource.getRepository(TblSalesExecutives);
        const user = await salesExecutiveRepository.findOne({ where: { phoneNumber } });
        return !!user;  // Returns true if user exists, false otherwise
    } catch (error) {
        throw new Error('Error in checkUserRepository: ' + error.message);
    }
};
  

  export const submitFormRepository = async (firstName, lastName, phoneNumber, pincode, commissionLevel) => {
	try {
	  const salesExecutiveRepository = AppDataSource.getRepository(TblSalesExecutives);
	  const newSalesExecutive = salesExecutiveRepository.create({
		firstName,
		lastName,
		phoneNumber,
		pincode,
		level: commissionLevel,
	  });
	  await salesExecutiveRepository.save(newSalesExecutive);
	  return true;
	} catch (error) {
	  throw new Error('Error in submitFormRepository: ' + error.message);
	}
  };
  

  export const submitTeamMemberRepository = async (teamMemberData) => {
	try {
	  const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
	  const newTeamMember = salesExecutiveRepo.create(teamMemberData);
	  await salesExecutiveRepo.save(newTeamMember);
	  return true;
	} catch (error) {
	  throw new Error('Error in submitTeamMemberRepository: ' + error.message);
	}
  };

  export const getMyTeamRepository = async (phoneNumber) => {
    try {
        const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
        return await salesExecutiveRepo.find({ where: { addedBy: phoneNumber } });
    } catch (error) {
        throw new Error('Error in getMyTeamRepository: ' + error.message);
    }
};

  export const getProfileRepository = async (phoneNumber) => {
	try {
	  const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
	  return await salesExecutiveRepo.findOne({ where: { phoneNumber: phoneNumber } });
	} catch (error) {
	  throw new Error('Error in getProfileRepository: ' + error.message);
	}
  };

  export const updateProfileRepository = async (phoneNumber, updates) => {
	try {
	  const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
	  const result = await salesExecutiveRepo.update({ phoneNumber: phoneNumber }, updates);
		console.log(result, "fdfkjdkklk")
	  return result.affected > 0; // Returns true if the update was successful
	} catch (error) {
	  throw new Error('Error in updateProfileRepository: ' + error.message);
	}
  };

  export const getShopsRepository = async (salesAssociateNumber) => {
	try {
	  const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);
	  return await shopkeeperRepo.find({ where: { salesAssociateNumber } });
	} catch (error) {
	  throw new Error('Error in getShopsRepository: ' + error.message);
	}
  };
  
export const updateShopkeeperProfileRepository = async (
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
    const shopkeeperRepo = AppDataSource.getRepository(Shopkeeper);

    const result = await shopkeeperRepo.update(
      { phoneNumber },
      {
        shopkeeperName,
        pincode,
        shopState,
        city,
        address,
        salesAssociateNumber,
        selectedCategory
      }
    );
    return result.affected > 0;
  } catch (error) {
    throw new Error('Error in updateShopkeeperProfileRepository: ' + error.message);
  }
};

export const checkSalesAssociateRepository = async (number) => {
	try {
	  const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
  
	  const result = await salesExecutiveRepo
		.createQueryBuilder('salesExecutive')
		.where('salesExecutive.phoneNumber = :number', { number })
		.getCount();
  
	  return result > 0;
	} catch (error) {
	  throw new Error('Error in checkSalesAssociateRepository: ' + error.message);
	}
  };

  export const getCommissionByLevelRepository = async (level) => {
	try {
	  const commissionRepository = AppDataSource.getRepository(Commission);
  
	  const result = await commissionRepository
		.createQueryBuilder('commission')
		.select('commission.commission_amount', 'commissionAmount')
		.where('commission.level = :level', { level })
		.getRawOne();
  
	  return result ? result.commissionAmount : null;
	} catch (error) {
	  throw new Error('Error in getCommissionByLevelRepository: ' + error.message);
	}
  };

  export const getUserLevelRepository = async (mobileNumber) => {
    try {
      const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
      const result = await salesExecutiveRepo
        .createQueryBuilder('salesExecutive')
        .select('salesExecutive.level', 'level')
        .where('salesExecutive.phoneNumber = :mobileNumber', { mobileNumber })
        .getRawOne();
		console.log(result, "---")
		if (result) {
			return result.level;
		} else {
			return false;
		}
    //   return result ? result.level : null;
    } catch (error) {
      throw new Error('Error in getUserLevelRepository: ' + error.message);
    }
  };

  export const getUserLevelAndAddedByRepository = async (mobileNumber) => {
	try {
	  const salesExecutiveRepo = AppDataSource.getRepository(TblSalesExecutives);
  
	  const result = await salesExecutiveRepo
		.createQueryBuilder('salesExecutive')
		.select(['salesExecutive.level', 'salesExecutive.addedBy'])
		.where('salesExecutive.phoneNumber = :mobileNumber', { mobileNumber })
		.getRawOne();


		if (result) {
			const response = {
				level: result ? result.salesExecutive_level  : '',
				addedBy: result ? result.salesExecutive_addedBy : ''
			};
			return response;
		} 
		return null;
	} catch (error) {
	  throw new Error('Error in getUserLevelAndAddedByRepository: ' + error.message);
	}
  };

  export const getCommissionAmountRepository = async (level) => {
	try {
	  const commissionRepo = AppDataSource.getRepository(Commission);
  
	  const result = await commissionRepo
		.createQueryBuilder('commission')
		.select('commission.commission_amount', 'commissionAmount')
		.where('commission.level = :level', { level })
		.getRawOne();
  console.log("result,", result)
	  return result ? result.commissionAmount : null;
	} catch (error) {
	  throw new Error('Error in getCommissionAmountRepository: ' + error.message);
	}
  };

export const getCommissionAdjustmentRepository = async (fromLevel, toLevel) => {
	try {
	  const commissionLevelRepo = AppDataSource.getRepository(CommissionLevel);
		console.log(fromLevel, toLevel, "----")
	  const result = await commissionLevelRepo
		.createQueryBuilder('commissionLevel')
		.select('commissionLevel.commission_amount', 'commissionAmount')
		.where('commissionLevel.from_level = :fromLevel AND commissionLevel.to_level = :toLevel', { fromLevel, toLevel })
		.getRawOne();
		console.log(result, "------")
	  return result ? result.commissionAmount : 0;
	} catch (error) {
	  throw new Error('Error in getCommissionAdjustmentRepository: ' + error.message);
	}
  };
  
 