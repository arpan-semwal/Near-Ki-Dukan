import { getShopkeeperProducts, deleteProductFromShopkeeper } from '../services/shopkeeperProductsService.js';

// Fetch shopkeeper's products
export const getShopkeeperProductsController = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        console.log('Selected Phone Number:', phoneNumber); // Debugging statement
        const products = await getShopkeeperProducts(phoneNumber);
        console.log('Fetched Products:', products); // Debugging statement
        res.status(200).json({
            success: true,
            data: products,
            message: 'Products fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching selected products:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching selected products',
            error: error.message
        });
    }
};

// Delete a product from a shopkeeper's list
export const deleteProductFromShopkeeperController = async (req, res) => {
    try {
        const { phoneNumber, productId } = req.body;
        await deleteProductFromShopkeeper(phoneNumber, productId);
        res.status(200).json({
            success: true,
            data: null,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error deleting product',
            error: error.message
        });
    }
};
