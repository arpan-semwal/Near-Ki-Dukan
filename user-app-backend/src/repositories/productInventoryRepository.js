import { AppDataSource } from '../config/data-source.js';
import { TblProductMaster } from '../entities/TblProductMaster.js';
import { ShopkeeperProducts } from '../entities/ShopkeeperProducts.js';
import { InternalServerError } from '../utils/errorHandlers.js';

//   const openai = new OpenAI();

// Fetch products by type (selectedCategory)
export const getProductsByCategory = async (category) => {
    try {
        const productRepository = AppDataSource.getRepository(TblProductMaster);
        const products = await productRepository.find({
            where: {
                type: category // Match the type
            }
        });
        return products;
    } catch (error) {
        throw new InternalServerError(error.message)
    }
};

// Add a product to a shopkeeper's list
export const addProductToShopkeeper = async (shopkeeperPhoneNumber, productId) => {
    try {
        const shopkeeperProductRepository = AppDataSource.getRepository(ShopkeeperProducts);
        const newEntry = shopkeeperProductRepository.create({ phoneNumber: shopkeeperPhoneNumber, productId });
        await shopkeeperProductRepository.save(newEntry);
    } catch (error) {
        throw new InternalServerError(error.message)
    }
};

// Add a Product as per media to a shopkeeper's list
export const addProductUsingVisionAi = async (shopkeeperPhoneNumber, productDetails) => {
    try {
        const shopkeeperProductRepository = AppDataSource.getRepository(ShopkeeperProducts);
        const productRepository = AppDataSource.getRepository(TblProductMaster);
        const { mainCategory, productName, brandName, weight, picturePath, preciseBrandName, type, weightType } = productDetails;
        // console.log(productId,"--------id");
        // Check if the product already exists
        const existingProduct = await productRepository.findOne({
            where: {
                main_category: mainCategory,
                product_name: productName,
                brand_name: brandName,
                weight: weight
            }
        });
        if (existingProduct) {
            // If product exists, throw a ConflictError with the existing product's ID
            throw new ConflictError(`Product already exists with ID: ${existingProduct.id}`);
        }
        // const newProduct = productRepository.create({ phoneNumber: shopkeeperPhoneNumber, product_name: detectedText, productId,  main_category:detectedText, brand_name:brandName, price:"12",productImage: uploadMediaFile, weight:"12", weight_type:"tre", type:"text"})
         // Create a new product entry
         const newProduct = productRepository.create({
            phoneNumber: shopkeeperPhoneNumber,
            product_name: productName,
            main_category: mainCategory,
            brand_name: brandName,
            price: productDetails.price, // Adjust based on the extracted details
            productImage: picturePath,
            weight: weight,
            weight_type: weightType,
            type: type
        });
        const ShopkeeperProduct = shopkeeperProductRepository.create({ phoneNumber: shopkeeperPhoneNumber, product_name: newProduct.product_name, productId: newProduct.id})
        shopkeeperProductRepository.save(ShopkeeperProduct)
        // Save the new product to the database
        const savedProduct = await productRepository.save(newProduct);
        // Return the saved product
        return savedProduct;
    } catch (error) {
        throw new InternalServerError(error.message)
    }
}