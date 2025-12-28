
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a Kyogre-themed meme using the Gemini 2.5 Flash Image model.
 */
export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  // Always obtain the API key exclusively from process.env.API_KEY
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("API_KEY environment variable is not set. Please add it to your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Attempt to fetch the logo for image-to-image reference
  let referencePart: any = null;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
    const resp = await fetch(logoUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (resp.ok) {
      const blob = await resp.blob();
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
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
    console.warn("Logo reference failed (CORS or Network). Falling back to text-only generation.", e);
  }

  const textPart = {
    text: `GENERATE A HIGH-QUALITY, VIBRANT, FULL-COLOR CINEMATIC MEME.
    CHARACTER: Kyogre (The Blue Legendary Whale Pokémon).
    DESCRIPTION: Deep blue body, glowing red circuitry patterns, white eye spots. 
    SCENE: ${prompt}.
    VISUALS: Majestic, powerful, deep-sea bioluminescence, 4K detail, vibrant colors.
    MUST: Ensure Kyogre looks exactly like the character in the reference logo if provided.`
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

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("Generation completed but no image was found in the response.");
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    
    if (error.message?.includes("API key")) {
      throw new Error("The API key provided is invalid or has expired. Verify the key in your project settings.");
    }
    
    throw error;
  }
}
