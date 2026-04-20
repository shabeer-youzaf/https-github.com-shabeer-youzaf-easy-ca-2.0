
import { GoogleGenAI } from '@google/genai';

export async function askTutor(question: string, chapterContext?: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: (process.env.GEMINI_API_KEY || process.env.API_KEY) as string });
  let prompt = `You are an expert ACCA Business & Technology tutor for a student named Nasrin. Your tone is warm, encouraging, and slightly playful. Explain concepts in simple English.`;

  if (chapterContext) {
    prompt += ` The user is currently studying the chapter "${chapterContext}". Answer the following question within this context:\n\nQ: ${question}`;
  } else {
    prompt += ` Answer the following general question about ACCA Business & Technology:\n\nQ: ${question}`;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text || "I couldn't generate an answer.";
}
