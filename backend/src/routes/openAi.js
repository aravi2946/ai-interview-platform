import { Router } from "express"
import AiController from "../controllers/AiController.js";

const aiRouter = Router()

aiRouter.post('/ai',AiController)

export default aiRouter;