
import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../constants";

/**
 * Downloads the project logo and converts it to base64 to use as a visual DNA reference.
 * This ensures the AI understands the specific look of the Burn Whale.
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
    console.warn("Reference logo unavailable, using text-only summoning.", error);
    return { data: "", mimeType: "" };
  }
}

/**
 * Generates a Burn Whale meme using the project logo as visual reference.
 */
export async function generateKyogreMeme(userPrompt: string): Promise<string> {
  // Always use process.env.API_KEY directly for initialization.
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

    // Updated instructions for "Burn Whale"
    parts.push({
      text: `VISUAL DNA REFERENCE: Use the provided image to generate a high-quality 4K cinematic artwork of the "Burn Whale".
      Character details: A massive, majestic whale often depicted with glowing red embers, fire effects, or made of molten lava.
      Scenario: ${userPrompt}. 
      The style should be epic, legendary, and highly detailed with a strong emphasis on fire, burning effects, and deflationary themes. 
      Maintain a consistent look for the whale based on the provided logo.`
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
      throw new Error("The Burn Engine failed to produce a result.");
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No visual artifact was found in the model response.");
  } catch (error: any) {
    console.error("Gemini Forge Failure:", error);
    if (error.message?.includes("API_KEY") || !process.env.API_KEY) {
      throw new Error("Primal Forge Locked: API_KEY is missing in environment variables.");
    }
    throw new Error(error.message || "Summoning failed. The flames went out.");
  }
}
