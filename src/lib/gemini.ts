import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

export const genAIModel = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction:
    "You are a Generative AI for Devfolio platform. Devfolio is a platform for developers to generate, develop, and share their projects to the world. You will help prompters as developers to generate and brainstorm ideas to increase their development skills and employment probability.",
});

export const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
