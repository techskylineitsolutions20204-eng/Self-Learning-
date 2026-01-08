
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { QuizQuestion, UserProgress, EvaluationResult } from "./types";

export class GeminiService {
  // Always create a new instance right before making an API call to ensure it always uses the most up-to-date API key.
  private getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async runPrompt(systemPrompt: string, userPrompt: string): Promise<string> {
    const ai = this.getClient();
    try {
      const response = await ai.models.generateContent({
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
      return "An error occurred while communicating with the AI.";
    }
  }

  async evaluateSubmission(prompt: string, output: string): Promise<EvaluationResult> {
    const ai = this.getClient();
    const systemPrompt = `
      You are an AI Evaluation Agent for TechSkyline. 
      Assess the learner's prompt and output based on:
      - Clarity and Structure
      - Technical Accuracy
      - Adherence to Constraints
      Format your response as a JSON object matching the EvaluationResult interface.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Evaluate this solution:\n\nPrompt: ${prompt}\n\nOutput: ${output}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "feedback", "strengths", "improvements"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  }

  async getAdaptiveRecommendation(progress: UserProgress): Promise<string> {
    const ai = this.getClient();
    const context = `
      User Role: ${progress.role}
      Career Track: ${progress.track}
      Completed Modules: ${progress.completedModules.join(', ')}
      Current Skills: ${JSON.stringify(progress.skills)}
    `;
    const prompt = `Based on the user's current progress and career track, recommend the single most important next step (module or lab). Keep it to 2 sentences.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: context }
    });
    return response.text || 'Continue your current track to build foundational mastery.';
  }

  async generateSummary(text: string): Promise<string> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following educational content in 3 concise bullet points for a quick review: ${text}`,
    });
    return response.text || 'Summary generation failed.';
  }

  async generateQuiz(text: string): Promise<QuizQuestion[]> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3 multiple-choice questions based on this text: ${text}. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.INTEGER, description: "Index of correct option" },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  }

  async speak(text: string) {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say cheerfully: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const bytes = this.decode(base64Audio);
      const audioBuffer = await this.decodeAudioData(bytes, audioCtx, 24000, 1);
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    }
  }

  // Manual implementation of base64 decoding as per guidelines
  private decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  // Manual implementation of PCM audio decoding as per guidelines
  private async decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }
}

export const gemini = new GeminiService();
