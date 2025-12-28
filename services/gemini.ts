
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a Kyogre-themed image using the Gemini 2.5 Flash Image model.
 */
export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  // Megpróbáljuk kinyerni a kulcsot minden lehetséges helyről
  const apiKey = (window as any).process?.env?.API_KEY || 
                 (window as any).VITE_API_KEY || 
                 (window as any).API_KEY;

  if (!apiKey) {
    throw new Error("HIÁNYZÓ API KULCS: Kérlek ellenőrizd, hogy az API_KEY be van-e állítva a környezeti változók között!");
  }

  // Új példány létrehozása a legfrissebb kulccsal
  const ai = new GoogleGenAI({ apiKey: apiKey });

  let referencePart: any = null;
  
  // Logó fetch kísérlet
  try {
    const resp = await fetch(logoUrl);
    if (resp.ok) {
      const blob = await resp.blob();
      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
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
    console.warn("Logo preview bypass active.");
  }

  const textPart = {
    text: `STUNNING CINEMATIC 4K MASTERPIECE. 
    CHARACTER: Kyogre (legendary sapphire blue sea Pokémon with red glowing lines).
    SCENE: ${prompt}.
    VIBE: Epic, high-power, oceanic authority. Professional digital art.`
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

    // Kép keresése a válaszban
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("A tenger mélye nem adott választ. Próbáld újra.");
  } catch (error: any) {
    console.error("Gemini Error Detail:", error);
    
    // Specifikus SDK hiba kezelés
    if (error.message?.includes("API key") || error.message?.includes("set when running")) {
      throw new Error("API CSATLAKOZÁSI HIBA: A böngésző nem látja a kulcsot. Ellenőrizd a beállításokat!");
    }
    
    throw new Error(error.message || "Ismeretlen hiba a generálás közben.");
  }
}
