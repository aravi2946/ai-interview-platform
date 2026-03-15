import express from "express"
import { ENV } from "./lib/env.js"
import  cors from "cors"
import { connectToDB } from "./lib/db.js";
import authController from "./controllers/authController.js";
import aiRouter from "./routes/openAi.js";
import interviewRoute from "./routes/interviewRoutes.js";

const app = express();

app.use(express.json())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api/auth",authController)
app.use('/api/open', aiRouter)
app.use("/interviews",interviewRoute)
//Database connection
connectToDB();

app.listen(ENV.PORT, () => {
    console.log(`Server running at port : ${ENV.PORT}`);
    
})