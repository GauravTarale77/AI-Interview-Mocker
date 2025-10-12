import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      jsonMockResp,
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy,
      createdAt,
    } = body;

    const inserted = await db
      .insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(jsonMockResp),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy,
        createdAt,
      })
      .returning({ mockId: MockInterview.mockId });

    return NextResponse.json({ ok: true, inserted });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "DB insert failed" },
      { status: 500 }
    );
  }
}
