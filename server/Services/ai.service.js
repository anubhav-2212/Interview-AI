import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { json, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// export async function main() {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: "Explain what is an Interview",
//     });
//     console.log(response.text);
// }

const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intent: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question,what points to cover,what approaches to take,etc"),
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intent: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question,what points to cover,what approaches to take,etc"),
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["high", "medium", "low"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        task: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc."),
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
    matchScore: z.number().describe("The match score between the candidate's profile and the job describe, ranging from 0 to 100"),
})
async function generateInterviewReport({ jobDescription, resumeText, selfDescription }) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate an interview report for the following job describe and resume text:
        Job Description: ${jobDescription}
        Resume Text: ${resumeText}
        Self Description: ${selfDescription}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });
    console.log(JSON.parse(response.text))
}
export default generateInterviewReport;










