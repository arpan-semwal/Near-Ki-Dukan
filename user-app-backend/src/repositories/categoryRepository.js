import { AppDataSource } from '../config/data-source.js';
import { Category } from '../entities/Category.js';

export const addCategories = async (categories) => {
    try {
        const repository = AppDataSource.getRepository(Category);
        await repository.save(categories);  // Save categories to the database
    } catch (error) {
        throw new Error('Error adding categories to the database: ' + error.message);
    }
};