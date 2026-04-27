import { PDFParse } from "pdf-parse";
import {generateInterviewReport, generateResumePdf } from "../Services/ai.service.js";
import InterviewReportModel from "../models/interviewReport.model.js";
export const generateInterviewReportController = async (req, res) => {
    try {
        const { jobDescription, selfDescription } = req.body;

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
        // console.log(JSON.stringify(interviewReportByAI, null, 2));
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

export const getAllInterviewReportsController = async (req, res) => {
    try {
        const interviewReports = await InterviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -resume -selfDescription -jobDescription -__v");
        return res.status(200).json({
            success: true,
            message: "Interview reports fetched successfully",
            data: interviewReports
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error fetching interview reports",
            error: error.message,
        })
    }
}

export const getInterviewReportByIdController = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const interviewReport = await InterviewReportModel.findById(interviewId);
        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Interview report fetched successfully",
            data: interviewReport
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error fetching interview report",
            error: error.message,
        })
    }
}



export const generateResumePdfController = async (req, res) => {
    const { interviewId } = req.params;
    // console.log("interviewId",interviewId);

    const interviewReport = await InterviewReportModel.findById(interviewId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`
    })

    res.send(pdfBuffer)
}


