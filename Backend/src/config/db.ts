import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("connected to database successfully");
  } catch (error) {
    console.log("failed to connect to database" + error);
    process.exit(1);
  }
};
