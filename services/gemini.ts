
import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../constants";

/**
 * Helper function to download the logo and convert it to base64 format.
 */
async function getLogoAsBase64(): Promise<{ data: string; mimeType: string }> {
  try {
    const response = await fetch(CONFIG.LOGO_URL);
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
    console.warn("Could not fetch reference logo, proceeding with text only.", error);
    return { data: "", mimeType: "" };
  }
}

/**
 * Generates a Kyogre meme using the project logo as a visual reference.
 */
export async function generateKyogreMeme(userPrompt: string): Promise<string> {
  // Always obtain the API key exclusively from the environment variable process.env.API_KEY.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing API_KEY environment variable.");
  }

  // Create a new instance right before making the call.
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const logoData = await getLogoAsBase64();
    const parts: any[] = [];

    // Add reference image if available
    if (logoData.data) {
      parts.push({
        inlineData: {
          data: logoData.data,
          mimeType: logoData.mimeType
        }
      });
    }

    // Main prompt
    parts.push({
      text: `STRICT VISUAL REFERENCE: Use the provided image to accurately depict the character Kyogre (a massive sapphire-blue whale-like creature with white belly and red circuitry patterns on its fins). Generate a high-quality cinematic artwork. Scenario: ${userPrompt}. Epic scale, high detail, glowing effects.`
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
      throw new Error("No response content from the Primal Engine.");
    }

    // Look for the image part
    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("The Primal Forge produced no visual artifact.");
  } catch (error: any) {
    console.error("Gemini Execution Error:", error);
    throw new Error(error.message || "Summoning failed due to an unknown disturbance.");
  }
}
