import dotenv from 'dotenv';
import { AppDataSource } from '../config/data-source.js';
import { Category } from '../entities/Category.js';

dotenv.config(); // Load environment variables from .env file

const categories = [
  { id: 1, name: 'Grocery Shop', icon: null, type: 'product' },
  { id: 2, name: 'Vegetable Shop', icon: null, type: 'product' },
  { id: 3, name: 'Sweets Shop', icon: null, type: 'product' },
  { id: 4, name: 'Stationary Shop', icon: null, type: 'product' },
  { id: 5, name: 'Salon Shop', icon: null, type: 'service' },
];

const addCategories = async () => {
  try {
    console.log('Initializing the database connection...');
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    const repository = AppDataSource.getRepository(Category);
    await repository.save(categories);
    console.log('Categories added successfully');
  } catch (error) {
    console.error('Error adding categories to the database:', error.message);
  } finally {
    console.log('Closing the database connection...');
    await AppDataSource.destroy();
  }
};

addCategories();
