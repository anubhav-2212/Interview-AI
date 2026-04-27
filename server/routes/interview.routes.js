import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateInterviewReportController, generateResumePdfController, getAllInterviewReportsController, getInterviewReportByIdController } from "../controllers/interview.controller.js";
import upload from "../middlewares/file.middleware.js";
const interviewRouter = express.Router();
/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post('/', authMiddleware, upload.single("resume"), generateInterviewReportController)
/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get('/', authMiddleware, getAllInterviewReportsController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get('/report/:interviewId', authMiddleware, getInterviewReportByIdController)

interviewRouter.get('/generate-resume-pdf/:interviewId', authMiddleware, generateResumePdfController);

export default interviewRouter;