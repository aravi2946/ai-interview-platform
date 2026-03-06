import express from "express"
import authController from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post('/google',authController)

export default authRouter;