// app/api/interviews/route.js
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (!email) {
    return NextResponse.json(
      { ok: false, error: "email is required" },
      { status: 400 }
    );
  }

  const rows = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, email))
    .orderBy(desc(MockInterview.id));

  return NextResponse.json({ ok: true, rows });
}
