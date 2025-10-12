import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const rows = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));
    if (!rows.length)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    const { id } = await params;
    await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, id));
    const deleted = await db
      .delete(MockInterview)
      .where(eq(MockInterview.mockId, id))
      .returning();
    if (!deleted.length) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
