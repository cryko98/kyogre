import { GoogleGenAI } from "@google/genai";

/**
 * Generates a high-quality Kyogre meme image using the gemini-2.5-flash-image model.
 * Relies on the platform-provided process.env.API_KEY.
 */
export async function generateKyogreMeme(userPrompt: string): Promise<string> {
  // Always initialize right before use to ensure the most current environment state is captured.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

    // Iterate through parts to find the image data as per SDK guidelines for Flash Image models
    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Image data was not found in the Primal Engine response.");
  } catch (error: any) {
    console.error("Gemini Flash Image Error:", error);
    // Provide the raw error message if it's an API issue (like invalid key) to help the user debug.
    throw new Error(error.message || "The Summoning failed. Ensure your environment variables are correctly configured.");
  }
}
