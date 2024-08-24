import { AppDataSource } from '../config/data-source.js';
import { NewCustomer } from '../entities/NewCustomer.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';
import { TblSalesExecutives } from '../entities/TblSalesExecutives.js';

export const findUserByPhoneNumber = async (phoneNumber, userType) => {
    let repository;
    switch (userType) {
      case 'shopkeeper':
        repository = AppDataSource.getRepository(Shopkeeper);
        break;
      case 'customer':
        repository = AppDataSource.getRepository(NewCustomer);
        break;
      case 'sales':
        repository = AppDataSource.getRepository(TblSalesExecutives);
        break;
      default:
        throw new Error('Invalid user type');
    }
    return await repository.findOne({ where: { phoneNumber } });
  };
  
  
  
  export const saveUser = async (userData, userType) => {
    let repository;
    switch (userType) {
      case 'shopkeeper':
        repository = AppDataSource.getRepository(Shopkeeper);
        break;
      case 'customer':
        repository = AppDataSource.getRepository(Customer);
        break;
      case 'sales':
        repository = AppDataSource.getRepository(SalesExecutive);
        break;
      default:
        throw new Error('Invalid user type');
    }
    const user = repository.create(userData);
    await repository.save(user);
    return user;
  };

export const saveCustomer = async (userData) => {
    try {
        const repository = AppDataSource.getRepository(NewCustomer);
        const customer = repository.create(userData);
        await repository.save(customer);
        return customer;
    } catch (error) {
        throw error;
    }
};

export const checkPhoneNumberInDatabases = async (phoneNumber) => {
    const customerRepository = AppDataSource.getRepository(NewCustomer);
    const shopkeeperRepository = AppDataSource.getRepository(Shopkeeper);

    const customer = await customerRepository.findOneBy({ phoneNumber });
    const shopkeeper = await shopkeeperRepository.findOneBy({ phoneNumber });

    if (shopkeeper) {
        return { status: 'error', message: 'Phone number already exists in shopkeepers database' };
    }
    if (customer) {
        return { status: 'error', message: 'Phone number already exists in new customers database' };
    }
    return { status: 'success', message: 'Phone number available' };
};