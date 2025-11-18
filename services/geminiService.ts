import { GoogleGenAI, Type } from "@google/genai";
import { EssayLevel, EssayLength, TargetLanguage, EssayParagraph } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getWordCountEstimate = (
  essayLength: EssayLength,
  customWordCount: string
): { min: number; max: number } => {
  switch (essayLength) {
    case EssayLength.SHORT:
      return { min: 250, max: 350 };
    case EssayLength.MEDIUM:
      return { min: 550, max: 650 };
    case EssayLength.LONG:
      return { min: 900, max: 1100 };
    case EssayLength.CUSTOM:
      const count = parseInt(customWordCount);
      return { min: Math.max(50, count - 50), max: count + 50 }; // Add a small buffer for custom
    default:
      return { min: 550, max: 650 }; // Default to medium
  }
};

const getPrompt = (
  topic: string,
  level: EssayLevel,
  requirements: string,
  essayLength: EssayLength,
  customWordCount: string,
  targetLanguage: TargetLanguage
): string => {
  const { min, max } = getWordCountEstimate(essayLength, customWordCount);
  const wordCountInstruction = `The essay should be between ${min} and ${max} words.`;
  const languageInstruction = targetLanguage !== TargetLanguage.ENGLISH 
    ? `Write the entire essay in ${targetLanguage}.`
    : '';

  return `
    You are an expert academic writer and linguist. Your task is to write a high-quality, engaging, and well-structured essay.

    **Topic:** "${topic}"

    **Academic Level:** "${level}"
    
    ${wordCountInstruction}
    ${languageInstruction}

    **Specific Requirements:** "${requirements || 'None provided. Adhere to general best practices for this academic level.'}"

    **Tone:** Professional and humanized. The writing should sound natural, confident, and intelligent, avoiding robotic phrasing and clichés.

    **Instructions for Output:**
    1.  **Structure:** Create a compelling introduction that grabs the reader's attention, several body paragraphs that logically develop the main arguments with clear topic sentences, and a powerful conclusion that summarizes the key points and offers a final thought.
    2.  **Paragraphing and Headings:** Ensure each paragraph focuses on a single idea. Provide a concise, descriptive heading for each paragraph, including the introduction and conclusion.
    3.  **Language and Complexity:** Tailor the vocabulary, sentence structure, and depth of analysis to the specified academic level and the requested language.
    4.  **Formatting:** Do not include a title or any other meta-text outside the JSON structure.
    5.  **JSON Format:** You must output a JSON array, where each element is an object representing a paragraph. Each paragraph object must have two properties:
        *   \`heading\` (string): A concise, descriptive title for the paragraph.
        *   \`content\` (string): The full text content of the paragraph.

    Example of expected JSON output:
    [
      {
        "heading": "Introduction: The Rise of AI",
        "content": "Artificial intelligence (AI) has rapidly transformed various aspects of modern society..."
      },
      {
        "heading": "Impact on Employment",
        "content": "One significant area where AI is making its mark is the labor market..."
      },
      {
        "heading": "Ethical Considerations",
        "content": "Beyond economic implications, AI development raises profound ethical questions..."
      },
      {
        "heading": "Conclusion: A Future with AI",
        "content": "In conclusion, AI presents both immense opportunities and significant challenges..."
      }
    ]
  `;
};

export const generateEssay = async (
  topic: string,
  level: EssayLevel,
  requirements: string,
  essayLength: EssayLength,
  customWordCount: string,
  targetLanguage: TargetLanguage
): Promise<EssayParagraph[]> => {
  const prompt = getPrompt(topic, level, requirements, essayLength, customWordCount, targetLanguage);
  
  // Estimate max tokens for the response (e.g., 1.5 tokens per word is a rough estimate)
  // JSON output might be slightly more verbose than plain text, adjust if needed
  const { max } = getWordCountEstimate(essayLength, customWordCount);
  const estimatedMaxTokens = Math.ceil(max * 2); // Increased multiplier for JSON overhead

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        maxOutputTokens: estimatedMaxTokens,
        responseMimeType: "application/json", // Enforce JSON output
        responseSchema: { // Define the expected JSON schema
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              heading: {
                type: Type.STRING,
                description: 'A concise heading for the paragraph.',
              },
              content: {
                type: Type.STRING,
                description: 'The full text content of the paragraph.',
              },
            },
            required: ['heading', 'content'],
            propertyOrdering: ['heading', 'content'],
          },
        },
      }
    });
    
    // Access the parsed JSON object directly via response.json
    if (!response.json) {
      throw new Error("AI model did not return a valid JSON response.");
    }
    
    const parsedEssay: EssayParagraph[] = response.json as EssayParagraph[];

    // Validate the parsed structure (optional but good for robustness)
    if (!Array.isArray(parsedEssay) || !parsedEssay.every(p => typeof p.heading === 'string' && typeof p.content === 'string')) {
      throw new Error("Invalid essay structure received from AI model.");
    }

    return parsedEssay;
  } catch (error) {
    console.error("Error generating or parsing essay with Gemini:", error);
    // No longer need to catch SyntaxError specifically for JSON.parse
    throw new Error("Failed to communicate with the AI model or process its response.");
  }
};