import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateInterviewReportController } from "../controllers/interview.controller.js";
const interviewRouter = express.Router();

interviewRouter.post('/', authMiddleware, generateInterviewReportController)
generateInterviewReportController

export default interviewRouter;