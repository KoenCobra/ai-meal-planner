import { GoogleGenAI } from "@google/genai";

const googleAi = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

export default googleAi;
