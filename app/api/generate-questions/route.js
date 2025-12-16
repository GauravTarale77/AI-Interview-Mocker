import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

async function generateWithRetry(options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const resp = await ai.models.generateContent(options);
      return resp;
    } catch (err) {
      if (err?.status !== 503 || i === maxRetries - 1) {
        throw err;
      }
      const delay = 1000 * 2 ** i;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

export async function POST(req) {
  try {
    const { jobPosition, jobDesc, years, count = 5 } = await req.json();

    const prompt = `
Return exactly ${count} interview Q&A as a JSON array.
Each item: { "question": string, "answer": string }.
Base on:
- Job Position: ${jobPosition}
- Tech Stack: ${jobDesc}
- Years of Experience: ${years}
Output ONLY the JSON array.
`.trim();

    const resp = await generateWithRetry({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          minItems: count,
          maxItems: count,
          items: {
            type: "object",
            properties: {
              question: { type: "string" },
              answer: { type: "string" },
            },
            required: ["question", "answer"],
          },
        },
      },
    });

    const data = JSON.parse(resp.text);
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
