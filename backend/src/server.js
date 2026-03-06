import express from "express"
import { ENV } from "./lib/env.js"
import  cors from "cors"
import { connectToDB } from "./lib/db.js";
import authController from "./controllers/authController.js";

const app = express();

app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api/auth",authController)

//Database connection
connectToDB();

app.listen(ENV.PORT, () => {
    console.log(`Server running at port : ${ENV.PORT}`);
    
})