
import { GoogleGenAI } from "@google/genai";

/**
 * Generates an epic Kyogre-themed image using the Gemini 2.5 Flash Image model.
 */
export async function generateKyogreMeme(userPrompt: string) {
  // Accessing the API key directly from the environment as required.
  // Creating a new instance per-call ensures we always use the latest injected key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Detailed physical description to ensure the model produces a correct Kyogre.
  const kyogreVisuals = `Subject: Kyogre, the legendary Sea Basin Pokémon. 
    Description: A massive, sapphire-blue whale-like entity with a white underbelly. 
    Details: Bioluminescent glowing red circuitry-like lines running across its body and its two enormous pectoral fins. Four square-shaped fingers on each fin. 
    Eyes: Golden eyes with white oval spots above them.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a professional 4K cinematic digital illustration.
            ${kyogreVisuals}
            Scenario: ${userPrompt}.
            Style: Epic oceanic lighting, dynamic water splashes, bioluminescent red glow, masterpiece quality.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Extracting the image from the response parts according to SDK rules.
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("The depths of the sea returned no imagery. Try a different command.");
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    
    // Check for common issues
    if (error.message?.includes("API key")) {
      throw new Error("AUTHENTICATION ERROR: The Sea King does not recognize your credentials. Check API_KEY.");
    }
    
    throw new Error(error.message || "A rogue tidal wave disrupted the generation. Please try again.");
  }
}
