import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

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

