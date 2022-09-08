import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config()

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


/////////////////////////
// Uploads an image file
/////////////////////////
export const uploadImage = async(image: Buffer | string ):Promise<string> => {

    let image_url: string | undefined = "";

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };


    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (result) resolve(result.secure_url);
          else reject(error);
        },
      );
      streamifier.createReadStream(image).pipe(uploadStream);
    });

   
    

 

};


