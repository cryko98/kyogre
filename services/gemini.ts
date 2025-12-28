
import { GoogleGenAI } from "@google/genai";

export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  try {
    // Create instance inside the function as per guidelines to avoid stale closures
    // and ensure it uses the latest environment state.
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
      console.warn("API_KEY is missing from process.env. Generation may fail.");
    }
    
    const ai = new GoogleGenAI({ apiKey });

    // Resilient fetch for the reference image (Logo)
    let referencePart: any = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout
      const resp = await fetch(logoUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (resp.ok) {
        const blob = await resp.blob();
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            // Extract pure base64 data
            resolve(result.split(',')[1]);
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
      console.warn("Logo reference fetch failed or timed out. Generating based on text prompt alone.", e);
    }

    const textPart = {
      text: `Generate a high-resolution, VIBRANT, FULL-COLOR cinematic meme image.
      CHARACTER: Kyogre (Legendary Sea Basin Pokémon).
      KYOGRE DETAILS: A giant blue whale-like sea creature with distinct red line patterns on its body and glowing eyes.
      PROMPT SCENE: ${prompt}
      STYLIZATION: Dynamic oceanic environment, epic lighting, 4K detail. 
      CRITICAL: Absolutely NO grayscale or black-and-white. Use rich blues, reds, and bioluminescent effects.`
    };

    // The Gemini 2.5 Flash Image model works best with a combination of image reference and text.
    const parts = referencePart ? [referencePart, textPart] : [textPart];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("Empty response from AI model.");
    }

    // Find the image part in the response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("The AI model returned text but no image data.");
  } catch (error: any) {
    console.error("Meme Generation Error:", error);
    // Provide more specific feedback for common errors
    if (error.message?.includes("API_KEY")) {
      throw new Error("API Key is missing or invalid. Check your Vercel environment variables.");
    }
    throw error;
  }
}
