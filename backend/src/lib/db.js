import mongoose from "mongoose"
import { ENV } from "./env.js";


export const connectToDB = async () => {
    try {
        await mongoose.connect(ENV.DB_URL)
        console.log("Database Connected Successfully")
        
    } catch (err) {
        console.log("Database Connection Failed", err);
        process.exit(1)
        
    }
}