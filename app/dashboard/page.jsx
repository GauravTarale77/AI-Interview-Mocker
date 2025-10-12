import React from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import InterviewListClient from "./_components/InterviewListClient";
import AddNewInterview from "./_components/AddNewInterview";

export default async function Dashboard() {
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "";

  const interviewList = email
    ? await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, email))
        .orderBy(desc(MockInterview.id))
    : [];

  return (
    <div className="p-8">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Create and Start your AI Mockup Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
      <InterviewListClient interviewList={interviewList} />
    </div>
  );
}
