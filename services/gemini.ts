
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
 * Generates a Naruto meme.
 */
export async function generateKyogreMeme(userPrompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Note: We are using the logo as reference, but the prompt overrides the style significantly
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

    // Updated instructions for "NARUTO"
    parts.push({
      text: `VISUAL STYLE: High-quality anime art style, specifically resembling the Naruto Shippuden art style.
      Character details: Focus on Naruto Uzumaki (orange tracksuit, blonde spiky hair, headband) or characters from the Naruto universe.
      Scenario: ${userPrompt}. 
      Vibe: Epic, energetic, action-packed, or funny anime meme style. Use vibrant oranges, yellows, and dynamic lighting (chakra effects).`
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
      throw new Error("The Jutsu failed to produce a result.");
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
