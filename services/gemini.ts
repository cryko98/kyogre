
import { GoogleGenAI } from "@google/genai";

/**
 * Kiváló minőségű Kyogre képet generál a Gemini 3 Pro Image modellel.
 */
export async function generateKyogreMeme(userPrompt: string): Promise<string> {
  // Mindig friss példányt hozunk létre, hogy az éppen aktuális kulcsot használja
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const kyogreVisuals = `Kyogre, the legendary massive blue whale Pokémon. 
    Appearance: Sapphire-blue skin, white underbelly, enormous pectoral fins with four square fingers. 
    Special detail: Glowing red circuitry/lines along its body and fins. 
    Style: Epic cinematic digital art, 4K resolution, dramatic oceanic lighting.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `${kyogreVisuals} Scenario: ${userPrompt}. Masterpiece quality, bioluminescent glow, photorealistic water effects.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      }
    });

    // Végigmegyünk az összes részen, hogy megtaláljuk a képet (SDK szabály)
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("A tenger mélye üres választ küldött. Próbálkozz más szöveggel.");
  } catch (error: any) {
    console.error("Gemini 3 Pro Error:", error);
    
    // Specifikus hibaüzenet a kulcsra
    if (error.message?.includes("entity was not found") || error.message?.includes("API key")) {
      throw new Error("AUTH_REQUIRED: Kérlek kattints az 'AUTHORIZE' gombra a kulcs aktiválásához.");
    }
    
    throw new Error(error.message || "Ismeretlen hiba a generálás során.");
  }
}
