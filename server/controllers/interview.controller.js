import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../Services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";
export const generateInterviewReportController = async (req, res) => {
    try {
        const { jobDescription, selfDescription } = req.body;
        // console.log(req.file);
        // console.log(jobDescription);
        // console.log(selfDescription);
        const resumeContent = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
        // console.log(resumeContent);
        const interviewReportByAI = await generateInterviewReport({ jobDescription, resume: resumeContent, selfDescription });
        // console.log(interviewReportByAI);
        const interviewReport = new InterviewReportModel({
            user: req.user.id,
            jobDescription,
            resume: resumeContent.text,
            selfDescription,
            ...interviewReportByAI

        })
        console.log(JSON.stringify(interviewReportByAI, null, 2));
        await interviewReport.save();
        return res.status(200).json({
            success: true,
            message: "Interview report generated successfully",
            data: interviewReport
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({

            success: false,
            message: "Error generating interview report",
            error: error.message,

        })

    }


}