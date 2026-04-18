// import dotenv from "dotenv";
// dotenv.config();
// import { GoogleGenAI } from "@google/genai";
// import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema";

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// // export async function main() {
// //     const response = await ai.models.generateContent({
// //         model: "gemini-2.5-flash",
// //         contents: "Explain what is an Interview",
// //     });
// //     console.log(response.text);
// // }

// const interviewReportSchema = z.object({
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question that can be asked in the interview"),
//         intent: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question,what points to cover,what approaches to take,etc"),
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioral question that can be asked in the interview"),
//         intent: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question,what points to cover,what approaches to take,etc"),
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["high", "medium", "low"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         task: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc."),
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
//     matchScore: z.number().describe("The match score between the candidate's profile and the job describe, ranging from 0 to 100"),
// })
// async function generateInterviewReport({ jobDescription, resume, selfDescription }) {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: `
// You are an expert AI Interview Coach.

// Analyze the candidate profile.

// INPUT:

// Job Description:
// ${jobDescription}

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Return ONLY valid JSON in EXACT format:

// {
//   "title":"string",
//   "matchScore":85,

//   "technicalQuestions":[
//     {
//       "question":"string",
//       "intent":"string",
//       "answer":"string"
//     }
//   ],

//   "behavioralQuestions":[
//     {
//       "question":"string",
//       "intent":"string",
//       "answer":"string"
//     }
//   ],

//   "skillGaps":[
//     {
//       "skill":"string",
//       "severity":"high"
//     }
//   ],

//   "preparationPlan":[
//     {
//       "day":1,
//       "focus":"string",
//       "task":["string","string"]
//     }
//   ]
// }

// Do NOT return arrays of strings.
// Do NOT add markdown.
// Do NOT explain anything.
// `,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         },
//     });
//     return (JSON.parse(response.text))
// }
// export default generateInterviewReport;

import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateInterviewReport({
    jobDescription,
    resume,
    selfDescription
}) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",

            contents: `
You are an expert AI Interview Coach.

Analyze the candidate profile carefully.

INPUT:

Job Description:
${jobDescription}

Resume:
${resume}

Self Description:
${selfDescription}

Return ONLY valid JSON in this EXACT format:

{
  "title": "string",
  "matchScore": 85,

  "technicalQuestions": [
    {
      "question": "string",
      "intent": "string",
      "answer": "string"
    }
  ],

  "behavioralQuestions": [
    {
      "question": "string",
      "intent": "string",
      "answer": "string"
    }
  ],

  "skillGaps": [
    {
      "skill": "string",
      "severity": "high"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "string",
      "task": ["string", "string"]
    }
  ]
}

Rules:
- Return pure JSON only
- No markdown
- No explanation
- technicalQuestions must contain 5 objects
- behavioralQuestions must contain 3 objects
- skillGaps must contain 5 objects
- preparationPlan must contain 7 objects
`,

            config: {
                responseMimeType: "application/json"
            }
        });

        const data = JSON.parse(response.text);

        return {
            title: data.title || "Software Developer",

            matchScore: Number(data.matchScore) || 70,

            technicalQuestions: Array.isArray(data.technicalQuestions)
                ? data.technicalQuestions.map((item) => ({
                    question: item.question || "Technical Question",
                    intent: item.intent || "Assess technical knowledge",
                    answer: item.answer || "Provide clear explanation"
                }))
                : [],

            behavioralQuestions: Array.isArray(data.behavioralQuestions)
                ? data.behavioralQuestions.map((item) => ({
                    question: item.question || "Behavioral Question",
                    intent: item.intent || "Assess soft skills",
                    answer: item.answer || "Use STAR method"
                }))
                : [],

            skillGaps: Array.isArray(data.skillGaps)
                ? data.skillGaps.map((item) => ({
                    skill: item.skill || "Unknown Skill",
                    severity: ["high", "medium", "low"].includes(item.severity)
                        ? item.severity
                        : "medium"
                }))
                : [],

            preparationPlan: Array.isArray(data.preparationPlan)
                ? data.preparationPlan.map((item, index) => ({
                    day: Number(item.day) || index + 1,
                    focus: item.focus || "Interview Preparation",
                    task: Array.isArray(item.task)
                        ? item.task
                        : ["Study concepts", "Practice questions"]
                }))
                : []
        };

    } catch (error) {
        console.log(error);

        return {
            title: "Software Developer",
            matchScore: 70,

            technicalQuestions: [
                {
                    question: "Explain React Hooks.",
                    intent: "Check React fundamentals",
                    answer: "Explain useState and useEffect with examples."
                }
            ],

            behavioralQuestions: [
                {
                    question: "Tell me about yourself.",
                    intent: "Assess communication",
                    answer: "Give concise career summary."
                }
            ],

            skillGaps: [
                {
                    skill: "System Design",
                    severity: "medium"
                }
            ],

            preparationPlan: [
                {
                    day: 1,
                    focus: "DSA + Resume Review",
                    task: ["Practice arrays", "Improve resume"]
                }
            ]
        };
    }
}

export default generateInterviewReport;








