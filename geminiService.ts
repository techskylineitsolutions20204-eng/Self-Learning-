
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async runPrompt(systemPrompt: string, userPrompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });
      return response.text || 'No response received.';
    } catch (error) {
      console.error('Error calling Gemini:', error);
      if (error instanceof Error && error.message.includes('API_KEY')) {
        return "API Key is missing or invalid. Please check your environment configuration.";
      }
      return "An error occurred while communicating with the AI. Please try again.";
    }
  }
}

export const gemini = new GeminiService();
