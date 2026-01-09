
import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../constants";

/**
 * Downloads the project logo and converts it to base64 to use as a visual DNA reference.
 */
async function getLogoAsBase64(): Promise<{ data: string; mimeType: string }> {
  try {
    const response = await fetch(CONFIG.LOGO_URL);
    if (!response.ok) throw new Error("Logo fetch failed");
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        resolve({ data: base64data, mimeType: blob.type });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn("Reference logo unavailable.", error);
    return { data: "", mimeType: "" };
  }
}

/**
 * Generates a Fluffin meme.
 */
export async function generateKyogreMeme(userPrompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const logoData = await getLogoAsBase64();
    const parts: any[] = [];

    if (logoData.data) {
      parts.push({
        inlineData: {
          data: logoData.data,
          mimeType: logoData.mimeType
        }
      });
    }

    // Updated instructions for "FLUFFIN"
    parts.push({
      text: `VISUAL REFERENCE: Use the provided image to generate a high-quality 3D or 2D cute art style image of "Fluffin".
      Character details: A cute, fuzzy, monster-like creature. It should look friendly, chaotic but adorable. 
      Scenario: ${userPrompt}. 
      The style should be colorful, vibrant, and fun (Pixar-esque or high quality anime style). 
      Avoid fire or scary themes unless specifically asked. Keep it "fluffy".`
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("The Factory failed to produce a result.");
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No visual artifact was found.");
  } catch (error: any) {
    console.error("Gemini Failure:", error);
    if (error.message?.includes("API_KEY") || !process.env.API_KEY) {
      throw new Error("API_KEY is missing in environment variables.");
    }
    throw new Error(error.message || "Generation failed.");
  }
}
