import dotenv from 'dotenv';
import { AppDataSource } from '../config/data-source.js';
import { TblSalonSubSubServices } from '../entities/TblSalonSubSubServices.js';

dotenv.config();

const insertSubSubServiceData = async () => {
  try {
    console.log('Initializing the database connection...');
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    // Define the sub-sub-services to insert
    const subSubServices = [
      { id: 1, name: 'Buzz Cut', price: 10.00, description: 'A short haircut for men.', mainServiceId: 1, subCategoryId: 1 },
      { id: 2, name: 'Crew Cut', price: 15.00, description: 'A traditional short haircut for men.', mainServiceId: 1, subCategoryId: 1 },
      { id: 3, name: 'Fade Cut', price: 20.00, description: 'A popular men\'s haircut with fading.', mainServiceId: 1, subCategoryId: 1 },
      { id: 4, name: 'Pompadour', price: 25.00, description: 'A stylish haircut with volume.', mainServiceId: 1, subCategoryId: 1 },
      { id: 5, name: 'Undercut', price: 30.00, description: 'A trendy men\'s haircut with an undercut.', mainServiceId: 1, subCategoryId: 1 },
      { id: 6, name: 'Classic Shave', price: 15.00, description: 'A classic men\'s shave.', mainServiceId: 2, subCategoryId: 1 },
      { id: 7, name: 'Beard Shave', price: 20.00, description: 'A shave that leaves a beard style.', mainServiceId: 2, subCategoryId: 1 },
      { id: 8, name: 'Goatee Shave', price: 18.00, description: 'A shave that leaves a goatee.', mainServiceId: 2, subCategoryId: 1 }
    ];

    // Get the TblSalonSubSubServices repository
    const subSubServicesRepository = AppDataSource.getRepository(TblSalonSubSubServices);

    // Insert sub-sub-services
    await subSubServicesRepository.save(subSubServices);

    console.log('Sub-sub-services added successfully');
  } catch (error) {
    console.error('Error inserting data:', error.message);
  } finally {
    console.log('Closing the database connection...');
    await AppDataSource.destroy();
  }
};

insertSubSubServiceData();
