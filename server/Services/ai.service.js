import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain what is an Interview",
    });
    console.log(response.text);
}