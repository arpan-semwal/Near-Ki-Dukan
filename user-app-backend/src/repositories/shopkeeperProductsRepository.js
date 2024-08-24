import { AppDataSource } from '../config/data-source.js';
import { ShopkeeperProducts } from '../entities/ShopkeeperProducts.js';
import { TblProductMaster } from '../entities/TblProductMaster.js';

// Get shopkeeper's products
export const getShopkeeperProducts = async (phoneNumber) => {
    try {
        const productRepository = AppDataSource.getRepository(TblProductMaster);
        const shopkeeperProductRepository = AppDataSource.getRepository(ShopkeeperProducts);
        const products = await productRepository.createQueryBuilder('pm')
            .innerJoin(ShopkeeperProducts, 'sp', 'pm.id = sp.productId')
            .where('sp.phoneNumber = :phoneNumber', { phoneNumber })
            .select(['pm.id', 'pm.main_category', 'pm.product_name', 'pm.brand_name', 'pm.price', 'pm.weight', 'pm.picture_path'])
            .getMany();
        return products;
    } catch (error) {
        throw new Error('Error fetching products from repository: ' + error.message);
    }
};

// Delete a product from a shopkeeper's list
export const deleteProductFromShopkeeper = async (phoneNumber, productId) => {
    try {
        const shopkeeperProductRepository = AppDataSource.getRepository(ShopkeeperProducts);
        await shopkeeperProductRepository.delete({ phoneNumber, productId });
    } catch (error) {
        throw new Error('Error deleting product from repository: ' + error.message);
    }
};
