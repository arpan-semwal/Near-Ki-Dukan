import multer from "multer";
export const uploadS3 = multer({ storage: multer.memoryStorage() });

export const parseOpenAIResponse = async (content) => {
    const extractValue = (label) => {
        const match = content.match(new RegExp(`\\*\\*${label}\\*\\*\\s*:\\s*([^\\n]*)`, 'i'));
        return match ? match[1].trim() : null;
    };
    return {
        mainCategory: extractValue('Main Category'),
        productName: extractValue('Product Name'),
        brandName: extractValue('Brand Name'),
        price: extractValue('Price') === 'Not explicitly mentioned; presumed to be missing from the detected text.' ? null : extractValue('Price'),
        weight: extractValue('Weight') ? extractValue('Weight').split(' ')[0] + ' grams' : null,
        picture_path: extractValue('Picture Path'),
        preciseBrandName: extractValue('Precise Brand Name'),
        type: extractValue('Type'),
        weightType: extractValue('Weight Type')
    };
};