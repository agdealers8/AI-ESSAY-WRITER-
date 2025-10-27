
import { GoogleGenAI } from "@google/genai";
import { EssayLevel } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getPrompt = (topic: string, level: EssayLevel, requirements: string): string => {
  return `
    You are an expert academic writer and linguist. Your task is to write a high-quality, engaging, and well-structured essay.

    **Topic:** "${topic}"

    **Academic Level:** "${level}"

    **Specific Requirements:** "${requirements || 'None provided. Adhere to general best practices for this academic level.'}"

    **Tone:** Professional and humanized. The writing should sound natural, confident, and intelligent, avoiding robotic phrasing and clichés.

    **Instructions:**
    1.  **Structure:** Create a compelling introduction that grabs the reader's attention, several body paragraphs that logically develop the main arguments with clear topic sentences, and a powerful conclusion that summarizes the key points and offers a final thought.
    2.  **Paragraphing:** Ensure each paragraph focuses on a single idea and is clearly separated from the others. Use smooth transitions.
    3.  **Language and Complexity:** Tailor the vocabulary, sentence structure, and depth of analysis to the specified academic level.
    4.  **Formatting:** Do not include a title, headers, or any other meta-text. Begin directly with the essay's first sentence. Output the essay as plain text with paragraph breaks.
  `;
};

export const generateEssay = async (
  topic: string,
  level: EssayLevel,
  requirements: string
): Promise<string> => {
  const prompt = getPrompt(topic, level, requirements);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating essay with Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
