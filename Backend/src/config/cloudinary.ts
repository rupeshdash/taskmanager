import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath: any) => {
  try {
    if (!localFilePath) return null;
    // Upload file to cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been successfully uploaded
    console.log("uploadResult", uploadResult?.url);
    console.log("File uploaded on cloudinary");
    fs.unlinkSync(localFilePath);
    if(!uploadResult){
        console.log("Image could not be uploaded to cloudinary");
        
        return ;
    }else{
        return uploadResult
    }
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath); //remove the locally saved temp files as the upload operation gets failed

  }
};

export {uploadOnCloudinary}