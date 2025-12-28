
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a Kyogre-themed image using the Gemini 2.5 Flash Image model.
 * Adheres strictly to the @google/genai SDK guidelines.
 * Now uses a detailed textual description instead of a logo reference.
 */
export async function generateKyogreMeme(prompt: string) {
  // Initialize the GenAI client with the mandatory environment variable.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Detailed description of Kyogre to ensure the model understands the subject
  const kyogreDescription = `Kyogre is a massive, legendary blue whale-like Pokémon. 
    It has a deep sapphire-blue body with a white underbelly. 
    Its most striking features are the glowing red circuitry-like patterns running across its back and its two enormous pectoral fins. 
    Each fin has four large, square-shaped fingers with red markings. 
    It has golden eyes and two small white oval spots located just above its eyes. 
    Its tail is small with jagged, fringe-like edges.`;

  const textPart = {
    text: `Task: Generate a professional, high-definition 4K cinematic digital art piece.
    Subject: ${kyogreDescription}
    Scenario: ${prompt}.
    Artistic Style: Epic scale, realistic textures (glistening wet skin, bioluminescent red glow), dynamic oceanic lighting, masterwork quality.`
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

    // Extract the image from the response parts as per SDK rules
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("The depths of the ocean returned no imagery. Try a different command.");
  } catch (error: any) {
    console.error("Gemini API error:", error);
    
    const errorMessage = error.message || "An unexpected error occurred during generation.";
    
    if (errorMessage.includes("API key")) {
      throw new Error("API KEY ERROR: Ensure the API_KEY is correctly set in your environment variables.");
    }
    
    throw new Error(errorMessage);
  }
}
