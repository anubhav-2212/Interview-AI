import { generateReportAPI, getInterviewReportByIdApi, getInterviewReportsApi } from "../Services/interview.api.js";

import { useContext } from "react";
import { InterviewContext } from "../Interview.context.jsx";

export const useInterview = () => {
    const context = useContext(InterviewContext)
    if (!context) {
        throw new Error("useInterview must be used within InterviewProvider")
    }
    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async (jobDescription, selfDescription, resumeFile) => {
        setLoading(true)
        try {
            const response = await generateReportAPI(jobDescription, selfDescription, resumeFile)
            setReport(response.data)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }

    }
    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportByIdApi(interviewId)
            setReport(response.data)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }

    }
    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getInterviewReportsApi()
            setReports(response.data)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }

    }
    return { generateReport, getReportById, getReports, loading, report, reports }
}