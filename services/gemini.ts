
import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../constants";

/**
 * Segédfüggvény a logó letöltéséhez és base64 formátumra alakításához,
 * hogy referencia képként elküldhessük a modellnek.
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
  // Mindig a hívás pillanatában inicializálunk a környezeti kulccsal
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const logoData = await getLogoAsBase64();
    const parts: any[] = [];

    // Ha sikerült letölteni a logót, hozzáadjuk első part-ként (referencia)
    if (logoData.data) {
      parts.push({
        inlineData: {
          data: logoData.data,
          mimeType: logoData.mimeType
        }
      });
    }

    // Hozzáadjuk a szöveges utasítást
    parts.push({
      text: `Using the provided image as a strict visual reference for the character Kyogre (massive blue whale-like creature with glowing red lines), generate a new cinematic 4K digital artwork. Scenario: ${userPrompt}. Maintain the character's legendary essence and colors.`
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
      throw new Error("The Primal Engine returned an empty response.");
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response parts.");
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    throw new Error(error.message || "The Forge failed to summon the King.");
  }
}
