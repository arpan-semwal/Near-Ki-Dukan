// src/controllers/productInventoryController.js
import { getProductsByCategory, addProductToShopkeeper , addMediaProductService} from '../services/productInventoryService.js';
import { BadRequestError, CustomError, InternalServerError } from '../utils/errorHandlers.js';


// Fetch products by category
export const getProductsByCategoryController = async (req, res) => {
    try {
        const { category } = req.params;
        console.log('Selected Category:', category); // Debugging statement
        const products = await getProductsByCategory(category);
        console.log('Fetched Products:', products); // Debugging statement
        res.status(200).json({
            success: true,
            data: products,
            message: 'Products fetched successfully'
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// Add a product to a shopkeeper's list
export const addProductToShopkeeperController = async (req, res) => {
    try {
        const { shopkeeperPhoneNumber, productId } = req.body;

        if (!req.body) throw new BadRequestError("Request body is missing.");
        if (!shopkeeperPhoneNumber)  throw new BadRequestError("Shopkeeper phone number is required.");
        if (!productId)  throw new BadRequestError("Product ID is required.");
        
        await addProductToShopkeeper(shopkeeperPhoneNumber, productId);
        res.status(200).json({
            success: true,
            data: null,
            message: 'Product added to shopkeeper\'s list successfully'
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error adding product to shopkeeper\'s list',
            error: error.message
        });
    }
};

// Add a product to a shopkeeper's list with attached media
export const addMediaProductToShopkeeperController = async (req, res) => {
    try {
        if(!req.file) throw new BadRequestError("Picture is missing");
        if(!req.body) throw new BadRequestError("PhoneNumber is missing");
        const mediaFile = req.file;
        const { shopkeeperPhoneNumber } = req.body;

        const result = await addMediaProductService(shopkeeperPhoneNumber, mediaFile);

        res.status(200).json({
            success: true,
            data: null,
            message: 'Product added using mediafile to shopkeeper\'s list successfully',
            result: result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            data: null,
            message: error.message || 'Error adding product using media file to shopkeeper\'s list',
            error: error.message
        });
    }
};
