
import { GoogleGenAI } from "@google/genai";

export async function generateKyogreMeme(userPrompt: string): Promise<string> {
  // A kulcsot közvetlenül a process.env-ből olvassuk ki a hívás pillanatában
  const key = process.env.API_KEY;
  
  if (!key) {
    throw new Error("HIÁNYZÓ API KULCS: Kérlek ellenőrizd a Vercel Environment Variables beállításait (API_KEY).");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: key });
    
    // Kyogre pontos vizuális definíciója, hogy ne legyen félreértés a modellnél
    const kyogreIdentity = "Kyogre, the legendary massive blue whale Pokémon with white belly and glowing red circuitry patterns on its huge pectoral fins. Small golden eyes.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Professional 4K cinematic digital art of ${kyogreIdentity}. Scenario: ${userPrompt}. Masterpiece, high detail, epic oceanic atmosphere.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Kép kinyerése a válaszból a hivatalos SDK szabályok szerint
    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (part?.inlineData?.data) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }

    throw new Error("A modell nem küldött kép adatot. Próbálkozz más szöveggel.");
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw new Error(error.message || "Hiba történt a generálás során.");
  }
}
