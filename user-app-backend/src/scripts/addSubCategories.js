//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

//dotenv.config(); // Load environment variables from .env file

//const subcategories = [
//  { id: 1, categoryId: 5, name: 'Men' },
//  { id: 2, categoryId: 5, name: 'Women' },
//  { id: 3, categoryId: 5, name: 'Unisex' },
//];

//const addSubcategories = async () => {
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    const repository = AppDataSource.getRepository(TblSalonSubcategory);
//    await repository.save(subcategories);
//    console.log('Subcategories added successfully');
//  } catch (error) {
//    console.error('Error adding subcategories to the database:', error.message);
//  } finally {
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//addSubcategories();


// src/scripts/updateCategoryTypes.js

//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { Category } from '../entities/Category.js';

//dotenv.config(); // Load environment variables from .env file

//const updateCategoryTypes = async () => {
//  let connection;
//  try {
//    console.log('Initializing the database connection...');
//    connection = await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    const repository = connection.getRepository(Category);

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
//    if (connection) {
//      console.log('Closing the database connection...');
//      await AppDataSource.destroy();
//    }
//  }
//};

//updateCategoryTypes();

//import dotenv from 'dotenv';
//import { AppDataSource } from '../config/data-source.js';
//import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

//dotenv.config();

//const removeSubcategoryData = async () => {
//  try {
//    console.log('Initializing the database connection...');
//    await AppDataSource.initialize();
//    console.log('Database connected successfully');

//    // Get the TblSalonSubcategory repository
//    const subcategoryRepository = AppDataSource.getRepository(TblSalonSubcategory);

//    // Remove all data
//    await subcategoryRepository.clear();

//    console.log('Data removed successfully');
//  } catch (error) {
//    console.error('Error removing data:', error.message);
//  } finally {
//    console.log('Closing the database connection...');
//    await AppDataSource.destroy();
//  }
//};

//removeSubcategoryData();

import dotenv from 'dotenv';
import { AppDataSource } from '../config/data-source.js';
import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

dotenv.config();

const insertSubcategoryData = async () => {
  try {
    console.log('Initializing the database connection...');
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    // Define the subcategories to insert
    const subcategories = [
      { id: 1, category_id: 5, sub_category: 'Men' },
      { id: 2, category_id: 5, sub_category: 'Women' },
      { id: 3, category_id: 5, sub_category: 'Unisex' }
    ];

    // Get the TblSalonSubcategory repository
    const subcategoryRepository = AppDataSource.getRepository(TblSalonSubcategory);

    // Insert subcategories
    await subcategoryRepository.save(subcategories);

    console.log('Subcategories added successfully');
  } catch (error) {
    console.error('Error inserting data:', error.message);
  } finally {
    console.log('Closing the database connection...');
    await AppDataSource.destroy();
  }
};

insertSubcategoryData();

