import { Router } from "express"
import { InterviewSessionController } from "../controllers/InterviewController.js";
import AiController from "../controllers/AiController.js";


const interviewRoute = Router();

interviewRoute.post('/setup',InterviewSessionController)
interviewRoute.post('/session',AiController)
export default interviewRoute;