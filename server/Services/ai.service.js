import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
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
        question: z.string().description("The technical question that can be asked in the interview"),
        intent: z.string().description("The intention of the interviewer behind asking this question"),
        answer: z.string().description("How to answer this question,what points to cover,what approaches to take,etc"),
    })).description("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().description("The behavioral question that can be asked in the interview"),
        intent: z.string().description("The intention of the interviewer behind asking this question"),
        answer: z.string().description("How to answer this question,what points to cover,what approaches to take,etc"),
    })).description("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().description("The skill which the candidate is lacking"),
        severity: z.enum(["high", "medium", "low"]).description("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).description("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().description("The day number in the preparation plan, starting from 1"),
        focus: z.string().description("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        task: z.array(z.string()).description("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc."),
    })).description("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
    matchScore: z.number().description("The match score between the candidate's profile and the job description, ranging from 0 to 100"),
})










