import { AppDataSource } from '../config/data-source.js';
import { TblSalonMainServices } from '../entities/TblSalonMainServices.js';

const insertMainServices = async () => {
  try {
    console.log('Initializing the database connection...');
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    // Data to be inserted
    const mainServices = [
      { id: 1, name: 'Men Haircut', description: 'Standard haircut for men', subCategoryId: 1 },
      { id: 2, name: 'Men Shave', description: 'Professional shave and grooming', subCategoryId: 1 },
      { id: 3, name: 'Men Hair Coloring', description: 'Hair coloring services for men', subCategoryId: 1 },
      { id: 7, name: 'Women Haircut', description: 'Standard haircut for women', subCategoryId: 2 },
      { id: 8, name: 'Women Manicure', description: 'Manicure services for women', subCategoryId: 2 },
      { id: 9, name: 'Women Hair Coloring', description: 'Hair coloring services for women', subCategoryId: 2 },
      { id: 10, name: 'Unisex Haircut', description: 'Standard haircut for everyone', subCategoryId: 3 },
      { id: 11, name: 'Unisex Massage', description: 'Relaxing massage therapy', subCategoryId: 3 },
    ];

    // Get the repository for TblSalonMainServices
    const repository = AppDataSource.getRepository(TblSalonMainServices);

    // Insert the data
    await repository.save(mainServices);
    
    console.log('Main services added successfully');
  } catch (error) {
    console.error('Error inserting data:', error.message);
  } finally {
    console.log('Closing the database connection...');
    await AppDataSource.destroy();
  }
};

insertMainServices();
