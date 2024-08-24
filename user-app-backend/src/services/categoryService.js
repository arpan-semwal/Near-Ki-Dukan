import { AppDataSource } from '../config/data-source.js';
import { Category } from '../entities/Category.js';
import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';

export const getAllCategories = async () => {
  const categoryRepo = AppDataSource.getRepository(Category);
  return await categoryRepo.find();
};

export const getSubCategoriesByCategoryId = async (categoryId) => {
  const subCategoryRepo = AppDataSource.getRepository(TblSalonSubcategory);
  return await subCategoryRepo.find({ where: { category_id: categoryId } });
};

export const createCategoriesService = async (data) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  return await categoryRepo.save(data);
};

export const createSubCategoryService = async (data) => {
  const subCategoryRepo = AppDataSource.getRepository(TblSalonSubcategory);
  return await subCategoryRepo.save(data);
};

export const getCategoryByName = async (name) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  return await categoryRepo.findOne({ where: { name } });
};
