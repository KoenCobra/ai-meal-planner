import { GoogleGenAI } from "@google/genai";

// Initialize the Google Generative AI client
// The API key should be set in the environment variables
const googleai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

export default googleai;
