
import { GoogleGenAI } from "@google/genai";

export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  try {
    // Obtain API key exclusively from process.env.API_KEY as per instructions
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      throw new Error("API key is missing. Ensure 'API_KEY' is set in your environment variables.");
    }
    
    // Initialize the client right before usage
    const ai = new GoogleGenAI({ apiKey });

    // Resilient fetch for the reference image (Logo)
    let referencePart: any = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
      const resp = await fetch(logoUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const blob = await resp.blob();
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            // Extract pure base64 data
            if (result.includes(',')) {
              resolve(result.split(',')[1]);
            } else {
              resolve(result);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        
        referencePart = {
          inlineData: {
            data: base64,
            mimeType: blob.type || 'image/jpeg'
          }
        };
      }
    } catch (e) {
      console.warn("Logo reference fetch failed or timed out. Falling back to text-only description.", e);
    }

    const textPart = {
      text: `Create a cinematic, high-quality, VIBRANT, FULL-COLOR meme image.
      CHARACTER: Kyogre (The legendary blue whale-like Pokémon from the logo reference).
      DESCRIPTION: Blue skin, glowing red lines/patterns, white spots.
      SCENE: ${prompt}
      LIGHTING: Dramatic deep sea bioluminescence, epic cinematic feel.
      QUALITY: 4K, detailed, no grayscale, no black and white. Use intense colors.`
    };

    // Use gemini-2.5-flash-image as the default image generation model
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

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("AI returned an empty response. Please try a different prompt.");
    }

    // Find and return the image data
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("The AI generated text but failed to produce an image. Please try again.");
  } catch (error: any) {
    console.error("Meme Generation Error:", error);
    
    // Handle standard API errors
    if (error.message?.includes("API_KEY")) {
      throw new Error("The API key is missing or invalid. Please check your deployment settings.");
    }
    
    throw error;
  }
}
