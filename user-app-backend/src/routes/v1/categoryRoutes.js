import { Router } from 'express';
import { fetchCategories, fetchSubCategories, createCategories, createSubCategories, fetchCategoryByName } from '../../controllers/categoryController.js';

const router = Router();

router.get('/categories', fetchCategories);  // Fetch all categories
router.get('/subcategories/:categoryId', fetchSubCategories);  // Fetch sub-categories for a category

 
router.post('/categories', createCategories);  // Add new categories (Admin)
router.post('/subcategories', createSubCategories);  // Add new sub-categories(Admin)
router.get('/category', fetchCategoryByName);  // Fetch category by name

export default router;
