import mongoose from "mongoose";



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        });

        console.log("Database Connected");
    } catch (error) {
        console.log("Database error", error.message);
        throw error;
    }
};

export default connectDB;