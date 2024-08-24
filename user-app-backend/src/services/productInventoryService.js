// src/services/productInventoryService.js
import { getProductsByCategory as getProductsByCategoryRepo, addProductToShopkeeper as addProductToShopkeeperRepo, addProductUsingVisionAi as addProductUsingVisionAiRepo } from '../repositories/productInventoryRepository.js';
import { uploadImage } from '../services/s3Service.js';
import { openai } from '../../openAIconfig.js';
import vision from '@google-cloud/vision';
import { fileURLToPath } from 'url';
import path from 'path';
import { InternalServerError } from '../utils/errorHandlers.js';
import { parseOpenAIResponse } from '../utils/helper.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const credentialsPath = path.resolve(__dirname, '../../healthy-reason-427912-q7-a294c8cbf151.json');
// Set the environment variable
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;


// Get products by category
export const getProductsByCategory = async (category) => {
    try {
        return await getProductsByCategoryRepo(category);
    } catch (error) {
        throw error; 
    }
};

// Add a product to a shopkeeper's list
export const addProductToShopkeeper = async (shopkeeperPhoneNumber, productId) => {
    try {
        return await addProductToShopkeeperRepo(shopkeeperPhoneNumber, productId);
    } catch (error) {
        throw error; 
    }
};

// Add a product to a shopkeeper's list
export const addMediaProductService = async (shopkeeperPhoneNumber, mediaFile, productId) => {
    try {
        const client = new vision.ImageAnnotatorClient();
        const key = mediaFile.originalname + Date.now();
        const uploadMediaFile = await uploadImage(mediaFile,key);

        if (!uploadMediaFile) {
            throw new InternalServerError("Errow while uploading image to cloud");
        }
        // // Get the product details from Vision AI respnse
        const [result] = await client.annotateImage({
            image: { source: { imageUri: uploadMediaFile } },
            features: [
                { type: 'LABEL_DETECTION' },
                { type: 'LOGO_DETECTION' },
                { type: 'TEXT_DETECTION' },
            ],
        });
        const labels = result.labelAnnotations || [];
        const logos = result.logoAnnotations || [];
        const texts = result.textAnnotations || [];

        const productName = labels.length > 0 ? labels[0].description : 'Unknown Product';
        const brandName = logos.length > 0 ? logos[0].description : 'Unknown Brand';
        const detectedText = texts.length > 0 ? texts[0].description : 'No Text Detected';

        const openAiPrompt = `
            I have detected some information from an image of a product. Please analyze the provided details and extract the following attributes:

            1. **Main Category**: Identify the main category of the product.
            2. **Product Name**: Extract the name of the product.
            3. **Brand Name**: Determine the brand name of the product.
            4. **Price**: Extract any price information available. If no price information is available, please return 0.00 only(no need of any text or explanation). Ensure that if a price is provided, it is in numeric format with two decimal places (e.g., 12.34).
            5. **Weight**: Identify any weight information provided.
            6. **Picture Path**: This is the path to the image file.
            7. **Precise Brand Name**: Extract a precise brand name, if available.
            8. **Type**: Determine the type or category of the product.
            9. **Weight Type**: Identify the type of weight measurement used (e.g., grams, kilograms).

            Here is the information detected from the image:

            - **Product Name**: ${productName}
            - **Brand Name**: ${brandName}
            - **Detected Text**: ${detectedText}
            - **Labels**: ${labels}

            Picture Path: ${uploadMediaFile}

            Please provide a detailed analysis and extract the attributes as described.
            `;


        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": openAiPrompt}
              ],
            model: "gpt-4o-mini",
          });

        if (!completion || !completion.choices || completion.choices.length === 0) {
            throw new InternalServerError("Failed to extract sufficient data from OpenAI response.");
        }
        const openAiOutput = completion.choices[0].message.content.trim();;
        
        const productDetails = await parseOpenAIResponse(openAiOutput);
        
        return await addProductUsingVisionAiRepo(shopkeeperPhoneNumber, productDetails);
    } catch (error) {
        throw error; 
    }
};

