import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

const MIN_LEN = 10;

let aiClient = null;
async function getAI() {
  if (!aiClient) {
    const { GoogleGenAI } = await import("@google/genai");
    aiClient = new GoogleGenAI({
      apiKey:
        process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
        process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });
  }
  return aiClient;
}

async function scoreWithAI({ question, userAns, correctAns }) {
  const ai = await getAI();
  const prompt = [
    "You are an evaluator for technical interview answers.",
    "Return ONLY JSON with fields: rating (integer 1..5) and feedback (string 2-4 lines).",
    "No code fences or extra text.",
    `Question: ${question}`,
    correctAns
      ? `Reference Answer: ${correctAns}`
      : "Reference Answer: (not provided)",
    `User Answer: ${userAns}`,
    'Respond like: {"rating": 3, "feedback": "..."}',
  ].join("\n");

  const resp = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });

  const text = resp?.text ?? "";
  const match = text.match(/{[\s\S]*}/);
  if (!match) throw new Error("No JSON in model output");
  const parsed = JSON.parse(match[0]);
  if (
    typeof parsed.rating !== "number" ||
    typeof parsed.feedback !== "string"
  ) {
    throw new Error("Invalid AI JSON");
  }
  return { rating: parsed.rating, feedback: parsed.feedback };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      mockIdRef,
      question,
      correctAns = null,
      userAns,
      userEmail = null,
    } = body || {};
    if (!mockIdRef || !question || !userAns) {
      return NextResponse.json(
        { ok: false, error: "mockIdRef, question, and userAns are required" },
        { status: 400 }
      );
    }
    const trimmed = String(userAns).trim();
    if (trimmed.length < MIN_LEN) {
      return NextResponse.json(
        { ok: false, error: `Answer too short (min ${MIN_LEN} chars)` },
        { status: 400 }
      );
    }

    let rating, feedback;
    try {
      ({ rating, feedback } = await scoreWithAI({
        question,
        userAns: trimmed,
        correctAns,
      }));
    } catch (err) {
      console.error("AI scoring raw error:", err);
      return NextResponse.json(
        { ok: false, error: "AI scoring failed or returned invalid JSON" },
        { status: 502 }
      );
    }

    const inserted = await db
      .insert(UserAnswer)
      .values({
        mockIdRef,
        question,
        correctAns,
        userAns: trimmed,
        feedback,
        rating,
        userEmail,
      })
      .returning();

    return NextResponse.json({ ok: true, inserted });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
