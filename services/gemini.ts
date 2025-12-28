
import { GoogleGenAI } from "@google/genai";

// Initialize AI outside to be reused, but ensure it's safe
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  try {
    let base64Data = '';
    let hasInlineData = false;

    try {
      const logoResponse = await fetch(logoUrl, { mode: 'no-cors' });
      // Note: 'no-cors' won't allow us to read the blob, so we try regular fetch first
      const regularFetch = await fetch(logoUrl).catch(() => null);
      
      if (regularFetch && regularFetch.ok) {
        const logoBlob = await regularFetch.blob();
        const logoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(logoBlob);
        });
        base64Data = logoBase64.split(',')[1];
        hasInlineData = true;
      }
    } catch (fetchError) {
      console.warn("Could not fetch logo for reference due to CORS/Network. Falling back to text-only description.", fetchError);
    }

    const contents: any = {
      parts: []
    };

    if (hasInlineData) {
      contents.parts.push({
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg'
        }
      });
    }

    contents.parts.push({
      text: `Create a cinematic, brutalist, and intense image of the character Kyogre (a legendary blue whale-like creature with red glowing patterns). ${hasInlineData ? 'The character MUST look exactly like the one in the provided reference logo.' : ''} THE AESTHETIC MUST BE VIBRANT IN THE DEEP SEA. The scene should be: ${prompt}. High contrast, dramatic deep sea lighting, legendary power, 2K resolution, modern meme art style.`
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: contents,
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Meme generation failed:", error);
    throw error;
  }
}
