import {
  generateInterviewReportApi,
  getInterviewReportByIdApi,
  getAllInterviewReportsApi,
  generateResumePdfApi
} from "../Services/interview.api.js";

import { useContext } from "react";
import { InterviewContext } from "../Interview.context.jsx";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }
  const { loading, setLoading, report, setReport, allReports, setAllReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resume,
  }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReportApi({
        jobDescription,
        selfDescription,
        resumeFile:resume,
      });
      setReport(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewReportByIdApi(interviewId);
      setReport(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReportsApi();
      setAllReports(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
   const getResumePdfApi = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
      const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdfApi({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
  return {
    generateReport,
    getReportById,
    getReports,
    loading,
    report,
    allReports,
  };
};
