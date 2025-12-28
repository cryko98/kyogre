
import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../constants";

/**
 * Downloads the project logo and converts it to base64 to use as a visual DNA reference.
 * This ensures the AI understands the specific look of Kyogre.
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
 * Generates a Kyogre meme using the project logo as visual reference.
 * Uses process.env.API_KEY exclusively as per requirements.
 */
export async function generateKyogreMeme(userPrompt: string): Promise<string> {
  // Always use process.env.API_KEY directly for initialization.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const logoData = await getLogoAsBase64();
    const parts: any[] = [];

    // Providing the logo as inlineData provides a visual reference for the AI
    if (logoData.data) {
      parts.push({
        inlineData: {
          data: logoData.data,
          mimeType: logoData.mimeType
        }
      });
    }

    // Explicit instructions to maintain the "Kyogre" character design
    parts.push({
      text: `VISUAL DNA REFERENCE: Use the provided image to generate a high-quality 4K cinematic artwork of the character Kyogre. 
      Scenario: ${userPrompt}. 
      Strictly maintain the sapphire blue whale-like body, white belly, and glowing red lines/markings on the fins. 
      The style should be epic, legendary, and vibrant.`
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
      throw new Error("The Primal Engine failed to produce a result.");
    }

    // Find the image part in the response
    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No visual artifact was found in the model response.");
  } catch (error: any) {
    console.error("Gemini Forge Failure:", error);
    // If the error is related to API key, provide a specific helpful message for the developer
    if (error.message?.includes("API_KEY") || !process.env.API_KEY) {
      throw new Error("Primal Forge Locked: API_KEY is missing in environment variables.");
    }
    throw new Error(error.message || "Summoning failed. The ocean remains silent.");
  }
}
