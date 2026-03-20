import { Router } from "express"
import { endInterviewController, InterviewSessionController, validateController } from "../controllers/InterviewController.js";
import AiController from "../controllers/AiController.js";


const interviewRoute = Router();

interviewRoute.post('/setup',InterviewSessionController)
interviewRoute.post('/session', AiController)
interviewRoute.get('/:id/validate', validateController)
interviewRoute.post('/:id/end',endInterviewController)
export default interviewRoute;