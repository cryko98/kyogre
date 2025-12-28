
import { GoogleGenAI } from "@google/genai";

/**
 * Generates an epic Kyogre-themed image.
 * Uses gemini-2.5-flash-image as per the latest standards.
 */
export async function generateKyogreMeme(userPrompt: string) {
  // Ensure the API key is accessible from the environment
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API_KEY is missing from the environment. Please check your Vercel/System variables.");
  }

  // Initialize strictly according to SDK guidelines
  const ai = new GoogleGenAI({ apiKey });

  // Comprehensive visual description of Kyogre for the model
  const kyogreDescription = `Subject: Kyogre, the legendary Sea Basin Pokémon. 
    Appearance: A massive, majestic sapphire-blue whale-like creature with a white underbelly. 
    Key Features: Large pectoral fins with four square-shaped fingers, bioluminescent glowing red circuitry patterns along its sides and fins. 
    Eyes: Small golden eyes with white oval spots above them. 
    Texture: Smooth, glistening sapphire skin reflecting deep-sea light.`;

  const textPart = {
    text: `TASK: Generate a professional 4K cinematic digital illustration.
    SUBJECT DETAILS: ${kyogreDescription}
    SCENE COMMAND: ${userPrompt}.
    ART STYLE: Dramatic, epic scale, bioluminescent lighting, dynamic water particles, ultra-realistic textures, masterpiece quality.`
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [textPart] },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Iterate through parts to find the image data as per SDK rules
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("The abyss returned an empty response. Try a different prompt.");
  } catch (error: any) {
    console.error("Generator Service Error:", error);
    
    // Friendly error messages for common API issues
    if (error.message?.includes("API key")) {
      throw new Error("AUTHENTICATION ERROR: The Sea King does not recognize your credentials. Check API_KEY.");
    }
    
    throw new Error(error.message || "A tidal wave disrupted the generation. Please try again.");
  }
}
