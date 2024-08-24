import { s3Client } from "../../awsconfig.js";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { InternalServerError } from "../utils/errorHandlers.js";

const bucketName = process.env.S3_BUCKET_NAME;

export const uploadImage = async (file, key) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: key, // Customize the key as needed
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);
        console.log(data)
        if(data.$metadata.httpStatusCode == 200){
            const imageUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;
            return imageUrl;
        }
        throw new InternalServerError("Error while uploading picture to Cloud")
    } catch (err) {
        throw err;
    }
};

export const deleteImage = async (key) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: key,
        };

        const command = new DeleteObjectCommand(params);
        const data = await s3Client.send(command);
        return data;
    } catch (err) {
        throw err;
    }
};
