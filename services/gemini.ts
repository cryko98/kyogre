
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a high-quality Kyogre meme image using the gemini-2.5-flash-image model.
 * Accepts a specific API key passed from the component.
 */
export async function generateKyogreMeme(userPrompt: string, apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error("No API key provided. Please enter your Gemini API key below.");
  }

  // Initialize the API with the provided key
  const ai = new GoogleGenAI({ apiKey });

  const kyogreDescription = "Kyogre, the legendary massive sapphire-blue whale Pokémon with a white belly and glowing red circuitry-like patterns on its huge pectoral fins.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Professional 4K digital painting of ${kyogreDescription}. Scenario: ${userPrompt}. Masterpiece, high detail, epic oceanic atmosphere, glowing bioluminescent effects.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Check if candidates and content parts exist
    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("No response received from the Primal Engine.");
    }

    // Iterate through parts to find the image data
    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Image data was not found in the response.");
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw new Error(error.message || "Summoning failed. Check if your API key is valid.");
  }
}
