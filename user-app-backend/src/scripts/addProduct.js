import { AppDataSource } from '../config/data-source.js';
import { TblProductMaster } from '../entities/TblProductMaster.js';

const productData = [
    { id: 47, main_category: 'Grocery', product_name: 'Tea', brand_name: 'Tetley', precise_brand_name: 'Gold', price: 11.00, weight: '100 grams', type: 'Grocery Shop', picture_path: null, weight_type: 'grams' },
    { id: 48, main_category: 'Grocery', product_name: 'Juice', brand_name: 'Fresca', precise_brand_name: 'Apple Delight', price: 3.50, weight: '1 liter', type: 'Grocery Shop', picture_path: null, weight_type: null },
    { id: 49, main_category: 'Grocery', product_name: 'Coffee', brand_name: 'Bru', precise_brand_name: 'Gold', price: 16.00, weight: '100 grams', type: 'Grocery Shop', picture_path: null, weight_type: 'grams' },
    { id: 50, main_category: 'Grocery', product_name: 'Chips', brand_name: 'Lay’s', precise_brand_name: 'Classic', price: 2.20, weight: '50 grams', type: 'Grocery Shop', picture_path: null, weight_type: 'grams' },

    // Sweet Shop
    { id: 51, main_category: 'Sweets', product_name: 'Kaju Katli', brand_name: 'Haldiram', precise_brand_name: null, price: 9.00, weight: '250 grams', type: 'Sweet Shop', picture_path: null, weight_type: 'grams' },
    { id: 52, main_category: 'Sweets', product_name: 'Jalebi', brand_name: 'Bikanervala', precise_brand_name: null, price: 5.00, weight: '250 grams', type: 'Sweet Shop', picture_path: null, weight_type: 'grams' },
    { id: 53, main_category: 'Sweets', product_name: 'Barfi', brand_name: 'Haldiram', precise_brand_name: 'Kaju', price: 8.50, weight: '300 grams', type: 'Sweet Shop', picture_path: null, weight_type: 'grams' },
    { id: 54, main_category: 'Sweets', product_name: 'Gulab Jamun', brand_name: 'Bikaji', precise_brand_name: null, price: 6.50, weight: '1 kg', type: 'Sweet Shop', picture_path: null, weight_type: 'kg' },

    // Electronics Shop
    { id: 55, main_category: 'Electronics', product_name: 'Bluetooth Speaker', brand_name: 'JBL', precise_brand_name: 'Flip 5', price: 60.00, weight: '540 grams', type: 'Electronics Shop', picture_path: null, weight_type: 'grams' },
    { id: 56, main_category: 'Electronics', product_name: 'Smartwatch', brand_name: 'Samsung', precise_brand_name: 'Galaxy Watch', price: 250.00, weight: '100 grams', type: 'Electronics Shop', picture_path: null, weight_type: 'grams' },
    { id: 57, main_category: 'Electronics', product_name: 'Laptop', brand_name: 'Dell', precise_brand_name: 'Inspiron 15', price: 750.00, weight: '2 kg', type: 'Electronics Shop', picture_path: null, weight_type: 'kg' },
    { id: 58, main_category: 'Electronics', product_name: 'Digital Camera', brand_name: 'Canon', precise_brand_name: 'EOS 1500D', price: 400.00, weight: '450 grams', type: 'Electronics Shop', picture_path: null, weight_type: 'grams' },

    // Stationery Shop
    { id: 59, main_category: 'Stationery', product_name: 'Notebook', brand_name: 'Camlin', precise_brand_name: 'Notebook', price: 3.00, weight: '250 grams', type: 'Stationery Shop', picture_path: null, weight_type: 'grams' },
    { id: 60, main_category: 'Stationery', product_name: 'Pencil', brand_name: 'Faber-Castell', precise_brand_name: 'HB', price: 0.50, weight: '5 grams', type: 'Stationery Shop', picture_path: null, weight_type: 'grams' },
    { id: 61, main_category: 'Stationery', product_name: 'Ruler', brand_name: 'Apsara', precise_brand_name: 'Plastic Ruler', price: 1.00, weight: '20 grams', type: 'Stationery Shop', picture_path: null, weight_type: 'grams' },
];

const addProducts = async () => {
    try {
        await AppDataSource.initialize();
        const productRepository = AppDataSource.getRepository(TblProductMaster);

        for (const product of productData) {
            const newProduct = productRepository.create(product);
            await productRepository.save(newProduct);
        }

        console.log('Products added successfully');
    } catch (error) {
        console.error('Error adding products:', error);
    } finally {
        await AppDataSource.destroy();
    }
};

addProducts();
