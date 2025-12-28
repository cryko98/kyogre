
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a Kyogre-themed image using the Gemini 2.5 Flash Image model.
 * Adheres strictly to the @google/genai SDK guidelines.
 */
export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  // Initialize the GenAI client with the mandatory environment variable.
  // The system handles the injection of process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const parts: any[] = [];

  // Attempt to include the logo as context for the generation
  try {
    const response = await fetch(logoUrl);
    if (response.ok) {
      const blob = await response.blob();
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: blob.type || 'image/png'
        }
      });
    }
  } catch (error) {
    console.warn("Reference logo could not be loaded, using text prompt only.", error);
  }

  // Add the text prompt for image generation
  parts.push({
    text: `Create a professional, high-quality, cinematic 4K digital art piece featuring Kyogre (the legendary blue whale-like sea Pokémon). 
    Scenario: ${prompt}. 
    Details: Vibrant blue skin, glowing red circuitry patterns, majestic oceanic environment, epic lighting, 1K resolution.`
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
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
    
    // Pass through specific error messages for better debugging in the UI
    const errorMessage = error.message || "An unexpected error occurred during generation.";
    
    if (errorMessage.includes("API key")) {
      throw new Error("API KEY ERROR: Ensure the API_KEY is correctly set in your environment variables.");
    }
    
    throw new Error(errorMessage);
  }
}
