
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateKyogreMeme(prompt: string, logoUrl: string) {
  try {
    const logoResponse = await fetch(logoUrl);
    const logoBlob = await logoResponse.blob();
    const logoBase64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(logoBlob);
    });

    const base64Data = logoBase64.split(',')[1];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/jpeg'
            }
          },
          {
            text: `Create a cinematic, brutalist, and intense image of the character shown in this logo (Kyogre). The character MUST look exactly like the one in the logo (blue body, red patterns). THE AESTHETIC MUST BE VIBRANT IN THE DEEP SEA. The scene should be: ${prompt}. High contrast, dramatic deep sea lighting, legendary power, 2K resolution, modern meme art style.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Meme generation failed:", error);
    throw error;
  }
}
