import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001/api/v1/interview",
  withCredentials: true,
});
/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */

export const generateInterviewReportApi = async ({
  jobDescription,
  resumeFile,
  selfDescription,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("resume", resumeFile);
  formData.append("selfDescription", selfDescription);
  const response = await api.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportByIdApi = async (interviewId) => {
  const response = await api.get(`/report/${interviewId}`);
  return response.data;
};
/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReportsApi = async () => {
  const response = await api.get("/");
  return response.data;
};
