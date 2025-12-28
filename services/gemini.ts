
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a Kyogre-themed meme using the Gemini 2.5 Flash Image model.
 */
export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  // Mindig a process.env.API_KEY-t használjuk az inicializáláshoz
  const ai = new GoogleGenAI({ 
    apiKey: process.env.API_KEY || "" 
  });

  // Logó betöltése kép-alapú generáláshoz
  let referencePart: any = null;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); 
    const resp = await fetch(logoUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (resp.ok) {
      const blob = await resp.blob();
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
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
    console.warn("Logó betöltése sikertelen, csak szöveges promptot használunk.");
  }

  const textPart = {
    text: `GENERATE A STUNNING, FULL-COLOR, 4K RESOLUTION CINEMATIC IMAGE.
    CHARACTER: Kyogre (a legendás kék bálna-szerű Pokémon).
    APPEARANCE: Élénk kék test, világító piros mintákkal, fehér foltokkal a szemeinél. 
    SCENE: ${prompt}.
    ATMOSPHERE: Fenséges, erőteljes, víz alatti epikus látvány.
    NOTE: Nagy részletesség, professzionális minőség, ne legyen fekete-fehér.`
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

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("A tenger mélye nem küldött vissza képet. Próbálkozz más szöveggel.");
  } catch (error: any) {
    console.error("Gemini Hiba:", error);
    
    const errMsg = error.message?.toLowerCase() || "";
    if (errMsg.includes("api key") || errMsg.includes("403") || errMsg.includes("invalid")) {
      throw new Error("API Kulcs Hiba: Ellenőrizd, hogy az API_KEY környezeti változó megfelelően van-e beállítva a Vercel-ben vagy a helyi környezetben.");
    }
    
    throw error;
  }
}
