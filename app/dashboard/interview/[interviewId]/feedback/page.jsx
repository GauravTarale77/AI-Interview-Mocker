import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { asc, eq } from "drizzle-orm";
import FeedbackClient from "./_components/FeedbackClient";

export default async function Page({ params }) {
  const { interviewId } = await params;

  const rows = await db
    .select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdRef, interviewId))
    .orderBy(asc(UserAnswer.id));

  const ratings = rows
    .map((r) => Number(r.rating))
    .filter((n) => Number.isFinite(n));
  const avg5 = ratings.length
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;
  const overallOutOf10 = Math.round((avg5 / 5) * 10);

  return (
    <FeedbackClient
      interviewId={interviewId}
      feedbackList={rows}
      overallOutOf10={overallOutOf10}
    />
  );
}
