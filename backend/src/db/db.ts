import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI as string);
    } catch (error) {
        console.log(error);
    }
};