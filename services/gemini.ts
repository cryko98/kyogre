
import { GoogleGenAI } from "@google/genai";

/**
 * Generál egy Kyogre-témájú képet a Gemini 2.5 Flash Image modell használatával.
 */
export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  // Mindig közvetlenül a hívás előtt példányosítunk, process.env.API_KEY használatával
  const ai = new GoogleGenAI({ 
    apiKey: process.env.API_KEY 
  });

  let referencePart: any = null;
  
  // Megpróbáljuk betölteni a logót referenciának (CORS engedélyezve kell legyen a forráson)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const resp = await fetch(logoUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (resp.ok) {
      const blob = await resp.blob();
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      
      referencePart = {
        inlineData: {
          data: base64Data,
          mimeType: blob.type || 'image/jpeg'
        }
      };
    }
  } catch (e) {
    // Ha a logó nem tölthető be, nem állunk meg, megyünk tovább csak szöveggel
    console.warn("Reference image fetch failed, proceeding with text only.");
  }

  const textPart = {
    text: `GENERATE A HIGH-DEFINITION, CINEMATIC PHOTOREALISTIC IMAGE.
    SUBJECT: The Legendary Blue Sea Whale Pokémon named Kyogre.
    DETAILS: Deep blue body, glowing red circuitry patterns, white spots near eyes. Majestic and powerful.
    SCENE: ${prompt}.
    STYLE: Vibrant colors, 4K resolution, epic lighting, oceanic atmosphere.`
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: referencePart ? [referencePart, textPart] : [textPart] 
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Megkeressük az inlineData-t tartalmazó részt (a kép itt van)
    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in the response parts.");
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    
    // Ha 403-as vagy API key hibát kapunk vissza az API-tól
    if (error.message?.includes("403") || error.message?.includes("API key")) {
      throw new Error("API Kulcs Hiba: Az API kulcs érvénytelen vagy nincs engedélye a képmodellekhez. Ellenőrizd az ai.google.dev oldalon!");
    }
    
    throw new Error(error.message || "Ismeretlen hiba történt a generálás során.");
  }
}
