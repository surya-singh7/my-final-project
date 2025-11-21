import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.log("MongoDB Connection Failed:", error.message);
    }
}


