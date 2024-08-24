//// src/scripts/updateCategoryTypes.js

//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { Category } from '../entities/Category.js';

//dotenv.config(); // Load environment variables from .env file

//const updateCategoryTypes = async () => {
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    const repository = AppDataSource.getRepository(Category);

//    // Define the updates for each category
//    const updates = [
//      { id: 1, type: 'product' },
//      { id: 2, type: 'product' },
//      { id: 3, type: 'product' },
//      { id: 4, type: 'product' },
//      { id: 5, type: 'service' },
//    ];

//    for (const update of updates) {
//      await repository.update(update.id, { type: update.type });
//      console.log(`Updated category with id ${update.id} to type ${update.type}`);
//    }

//    // Verify the updates
//    const updatedCategories = await repository.find();
//    console.log('Updated categories:', updatedCategories);
//  } catch (error) {
//    console.error('Error updating categories in the database:', error.message);
//  } finally {
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//updateCategoryTypes();


 

//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonMainServices } from '../entities/TblSalonMainServices.js';

//dotenv.config(); // Load environment variables from .env file

//const updateMainServices = async () => {
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    const repository = AppDataSource.getRepository(TblSalonMainServices);

//    const services = [
//      { id: 1, name: 'Men Haircut', description: 'Standard haircut for men', sub_category_id: 1 },
//      { id: 2, name: 'Men Shave', description: 'Professional shave and grooming', sub_category_id: 1 },
//      { id: 3, name: 'Men Hair Coloring', description: 'Hair coloring services for men', sub_category_id: 1 },
//      { id: 4, name: 'Women Haircut', description: 'Standard haircut for women', sub_category_id: 2 },
//      { id: 5, name: 'Women Manicure', description: 'Manicure services for women', sub_category_id: 2 },
//      { id: 6, name: 'Women Hair Coloring', description: 'Hair coloring services for women', sub_category_id: 2 },
//      { id: 7, name: 'Unisex Haircut', description: 'Standard haircut for everyone', sub_category_id: 3 },
//      { id: 8, name: 'Unisex Massage', description: 'Relaxing massage therapy', sub_category_id: 3 },
//      { id: 9, name: 'Unisex Pedicure', description: 'Pedicure services for everyone', sub_category_id: 3 },
//      // Add or update other services with appropriate IDs
//    ];

//    for (const service of services) {
//      await repository.upsert(service, ['id']);
//    }

//    console.log('Main services updated successfully');

//  } catch (error) {
//    console.error('Error updating main services in the database:', error.message);
//  } finally {
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//updateMainServices();


//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonSubSubServices } from '../entities/TblSalonSubSubServices.js';

//dotenv.config();

//const upsertSubSubServices = async () => {
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    const repository = AppDataSource.getRepository(TblSalonSubSubServices);

//    const subSubServices = [
//      { id: 1, name: 'Buzz Cut', price: 10.00, main_service_id: 1 },
//      { id: 2, name: 'Crew Cut', price: 15.00, main_service_id: 1 },
//      { id: 3, name: 'Fade Cut', price: 20.00, main_service_id: 1 },
//      { id: 4, name: 'Pompadour', price: 25.00, main_service_id: 1 },
//      { id: 5, name: 'Undercut', price: 30.00, main_service_id: 1 },
//    ];

//    for (const service of subSubServices) {
//      const existingService = await repository.findOneBy({ id: service.id });

//      if (existingService) {
//        // Update existing service
//        await repository.update(service.id, service);
//        console.log(`Updated sub-sub service with id ${service.id}`);
//      } else {
//        // Insert new service
//        await repository.save(service);
//        console.log(`Inserted new sub-sub service with id ${service.id}`);
//      }
//    }

//    console.log('Sub-sub services processed successfully');

//  } catch (error) {
//    console.error('Error processing sub-sub services into the database:', error.message);
//  } finally {
//    try {
//      console.log('Closing the database connection...');
//      await AppDataSource.destroy();
//    } catch (closeError) {
//      console.error('Error closing the database connection:', closeError.message);
//    }
//  }
//};

//upsertSubSubServices();


//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

//const checkSubcategories = async () => {
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    const subcategoryRepository = AppDataSource.getRepository(TblSalonSubcategory);
    
//    // Fetch all subcategories
//    const subcategories = await subcategoryRepository.find();
//    console.log('Existing Subcategories:', subcategories);

//  } catch (error) {
//    console.error('Error fetching subcategories:', error.message);
//  } finally {
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//checkSubcategories();

//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

//dotenv.config();

//const keepSubcategories = [
//  { id: 1, name: 'Men', categoryId: 5 },
//  { id: 2, name: 'Women', categoryId: 5 },
//  { id: 3, name: 'Unisex', categoryId: 5 },
//];

//const updateSubcategories = async () => {
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    const subcategoryRepository = AppDataSource.getRepository(TblSalonSubcategory);

//    // Fetch all subcategories
//    const existingSubcategories = await subcategoryRepository.find();

//    // Get IDs of subcategories to keep
//    const idsToKeep = keepSubcategories.map(sub => sub.id);

//    // Find subcategories to delete (those not in the keep list)
//    const subcategoriesToDelete = existingSubcategories.filter(sub => !idsToKeep.includes(sub.id));

//    // Delete the subcategories that are not in the keep list
//    if (subcategoriesToDelete.length > 0) {
//      await subcategoryRepository.remove(subcategoriesToDelete);
//      console.log('Removed subcategories:', subcategoriesToDelete.map(sub => sub.id));
//    } else {
//      console.log('No subcategories to remove.');
//    }

//    // Optionally, insert or update the subcategories to ensure they exist
//    for (const subcategory of keepSubcategories) {
//      await subcategoryRepository.upsert(subcategory, ['id']);
//    }

//    console.log('Subcategories updated successfully');

//  } catch (error) {
//    console.error('Error updating subcategories:', error.message);
//  } finally {
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//updateSubcategories();


//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonMainServices } from '../entities/TblSalonMainServices.js';

//const checkMainServices = async () => {
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    const mainServiceRepository = AppDataSource.getRepository(TblSalonMainServices);
    
//    // Fetch all main services
//    const mainServices = await mainServiceRepository.find();
//    console.log('Existing Main Services:', mainServices);

//  } catch (error) {
//    console.error('Error fetching main services:', error.message);
//  } finally {
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//checkMainServices();


//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

//dotenv.config();

//const removeSubcategories = async () => {
//  let queryRunner;
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    // Create a query runner from the established data source
//    queryRunner = AppDataSource.createQueryRunner();
//    await queryRunner.connect();
//    await queryRunner.startTransaction();

//    const subcategoryRepository = queryRunner.manager.getRepository(TblSalonSubcategory);

//    // Fetch all subcategories
//    const existingSubcategories = await subcategoryRepository.find();

//    // IDs of subcategories you want to keep
//    const keepSubcategoryIds = [1, 2, 3];

//    // Find subcategories to delete (those not in the keep list)
//    const subcategoriesToDelete = existingSubcategories.filter(sub => !keepSubcategoryIds.includes(sub.id));

//    // Delete the subcategories that are not in the keep list
//    if (subcategoriesToDelete.length > 0) {
//      await subcategoryRepository.remove(subcategoriesToDelete);
//      console.log('Removed subcategories:', subcategoriesToDelete.map(sub => sub.id));
//    } else {
//      console.log('No subcategories to remove.');
//    }

//    await queryRunner.commitTransaction();
//  } catch (error) {
//    if (queryRunner) {
//      await queryRunner.rollbackTransaction();
//    }
//    console.error('Error removing subcategories:', error.message);
//  } finally {
//    if (queryRunner) {
//      await queryRunner.release();
//    }
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//removeSubcategories();


//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';
//import { TblSalonMainServices } from '../entities/TblSalonMainServices.js';
//import { TblSelectedServices } from '../entities/TblSelectedServices.js';
//import { TblSalonSubSubServices } from '../entities/TblSalonSubSubServices.js'; // Import TblSalonSubSubServices
//import { Category } from '../entities/Category.js';

//dotenv.config();

//const checkDataRemoval = async () => {
//  let queryRunner;
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    queryRunner = AppDataSource.createQueryRunner();
//    await queryRunner.connect();

//    // Get repositories
//    const subcategoryRepository = queryRunner.manager.getRepository(TblSalonSubcategory);
//    const mainServiceRepository = queryRunner.manager.getRepository(TblSalonMainServices);
//    const selectedServicesRepository = queryRunner.manager.getRepository(TblSelectedServices);
//    const subSubServicesRepository = queryRunner.manager.getRepository(TblSalonSubSubServices); // Add repository for TblSalonSubSubServices
//    const categoryRepository = queryRunner.manager.getRepository(Category);

//    // Fetch data from tables
//    const subcategories = await subcategoryRepository.find();
//    const mainServices = await mainServiceRepository.find();
//    const selectedServices = await selectedServicesRepository.find();
//    const subSubServices = await subSubServicesRepository.find(); // Fetch data from TblSalonSubSubServices
//    const categories = await categoryRepository.find();

//    // Log results
//    console.log('Categories:', categories);
//    console.log('Subcategories:', subcategories);
//    console.log('Main Services:', mainServices);
//    console.log('Selected Services:', selectedServices);
//    console.log('Sub-Sub Services:', subSubServices); // Log data for TblSalonSubSubServices

//  } catch (error) {
//    console.error('Error checking data removal:', error.message);
//  } finally {
//    if (queryRunner) {
//      await queryRunner.release();
//    }
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//checkDataRemoval();



// import { AppDataSource } from '../config/data-source.js'; // Adjust the path if needed
// import { Category } from '../entities/Category.js'; // Adjust the path if needed
// import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js'; // Adjust the path if needed
// import { TblSalonMainServices } from '../entities/TblSalonMainServices.js'; // Adjust the path if needed
// import { TblSalonSubSubServices } from '../entities/TblSalonSubSubServices.js'; // Adjust the path if needed

//const insertData = async () => {
//  let queryRunner;
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    queryRunner = AppDataSource.createQueryRunner();
//    await queryRunner.connect();
//    await queryRunner.startTransaction();

  
//    const subcategoryRepository = queryRunner.manager.getRepository(TblSalonSubcategory);
//    const mainServicesRepository = queryRunner.manager.getRepository(TblSalonMainServices);
//    const subSubServicesRepository = queryRunner.manager.getRepository(TblSalonSubSubServices);
 
    
//    // Subcategories
//    const subcategories = [
//      { id: 1, sub_category: 'Men', category_id: 5 },
//      { id: 2, sub_category: 'Women', category_id: 5 },
//      { id: 3, sub_category: 'Unisex', category_id: 5 },
//    ];

//    // Insert subcategories
//    await subcategoryRepository.save(subcategories);
//    console.log('Inserted subcategories:', subcategories);

//    // Main Services
//    const mainServices = [
//      { id: 1, name: 'Men Haircut', description: '', subCategoryId: 1 },
//      { id: 2, name: 'Men Shave', description: '', subCategoryId: 1 },
//      { id: 3, name: 'Men Hair Coloring', description: '', subCategoryId: 1 },
//      { id: 7, name: 'Women Haircut', description: '', subCategoryId: 2 },
//      { id: 8, name: 'Women Manicure', description: '', subCategoryId: 2 },
//      { id: 9, name: 'Women Hair Coloring', description: '', subCategoryId: 2 },
//      { id: 10, name: 'Unisex Haircut', description: '', subCategoryId: 3 },
//      { id: 11, name: 'Unisex Massage', description: '', subCategoryId: 3 },
//    ];

//    // Insert main services
//    await mainServicesRepository.save(mainServices);
//    console.log('Inserted main services:', mainServices);

//    // Sub-Sub Services
//    const subSubServices = [
//      { id: 1, name: 'Buzz Cut', price: '10.00', description: '', mainServiceId: 1, subCategoryId: 1 },
//      { id: 2, name: 'Crew Cut', price: '15.00', description: '', mainServiceId: 1, subCategoryId: 1 },
//      { id: 3, name: 'Fade Cut', price: '20.00', description: '', mainServiceId: 1, subCategoryId: 1 },
//      { id: 4, name: 'Pompadour', price: '25.00', description: '', mainServiceId: 1, subCategoryId: 1 },
//      { id: 5, name: 'Undercut', price: '30.00', description: '', mainServiceId: 1, subCategoryId: 1 },
//      { id: 6, name: 'Classic Shave', price: '15.00', description: '', mainServiceId: 2, subCategoryId: 1 },
//      { id: 7, name: 'Beard Shave', price: '20.00', description: '', mainServiceId: 2, subCategoryId: 1 },
//      { id: 8, name: 'Goatee Shave', price: '18.00', description: '', mainServiceId: 2, subCategoryId: 1 },
//    ];

//    // Insert sub-sub services
//    await subSubServicesRepository.save(subSubServices);
//    console.log('Inserted sub-sub services:', subSubServices);

//    await queryRunner.commitTransaction();
//  } catch (error) {
//    if (queryRunner) {
//      await queryRunner.rollbackTransaction();
//    }
//    console.error('Error inserting data:', error.message);
//  } finally {
//    if (queryRunner) {
//      await queryRunner.release();
//    }
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//insertData();



//import { AppDataSource } from '../config/data-source.js'; // Adjust the path if needed
//import { Category } from '../entities/Category.js'; // Adjust the path if needed

//const insertCategories = async () => {
//  let queryRunner;
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    queryRunner = AppDataSource.createQueryRunner();
//    await queryRunner.connect();
//    await queryRunner.startTransaction();

//    const categoryRepository = queryRunner.manager.getRepository(Category);

//    // Categories to insert
//    const categories = [
//      { id: 1, name: 'Grocery Shop', type: 'product', icon: null },
//      { id: 2, name: 'Vegetable Shop', type: 'product', icon: null },
//      { id: 3, name: 'Sweets Shop', type: 'product', icon: null },
//      { id: 4, name: 'Stationary Shop', type: 'product', icon: null },
//      { id: 5, name: 'Salon Shop', type: 'service', icon: null },
//    ];

//    // Insert categories
//    await categoryRepository.save(categories);
//    console.log('Inserted categories:', categories);

//    await queryRunner.commitTransaction();
//  } catch (error) {
//    if (queryRunner) {
//      await queryRunner.rollbackTransaction();
//    }
//    console.error('Error inserting categories:', error.message);
//  } finally {
//    if (queryRunner) {
//      await queryRunner.release();
//    }
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//insertCategories();


//import { AppDataSource } from '../config/data-source.js'; // Adjust the path if needed

//const removePhoneNumberData = async () => {
//  let queryRunner;

//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    queryRunner = AppDataSource.createQueryRunner();
//    await queryRunner.connect();

//    // Execute the query to delete data
//    await queryRunner.query(`DELETE FROM shopkeepers WHERE phoneNumber = '9058206605'`);
//    console.log('Data with phoneNumber 9852145636 removed successfully');

//  } catch (error) {
//    console.error('Error removing data:', error.message);
//  } finally {
//    if (queryRunner) {
//      await queryRunner.release();
//    }
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//removePhoneNumberData();


//import { AppDataSource } from '../config/data-source.js'; // Adjust the path if needed

//const fetchPhoneNumberData = async () => {
//  let queryRunner;

//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    queryRunner = AppDataSource.createQueryRunner();
//    await queryRunner.connect();

//    // Execute the query to fetch data
//    const result = await queryRunner.query(`SELECT * FROM shopkeepers WHERE phoneNumber = '9058206605'`);

//    if (result.length > 0) {
//      console.log('Data for phoneNumber 9058206605:', result);
//    } else {
//      console.log('No data found for phoneNumber 9058206605');
//    }

//  } catch (error) {
//    console.error('Error fetching data:', error.message);
//  } finally {
//    if (queryRunner) {
//      await queryRunner.release();
//    }
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//fetchPhoneNumberData();

