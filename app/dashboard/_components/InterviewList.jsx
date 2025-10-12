"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import InterviewItemCard from "./InterviewItemCard";

export default function InterviewList() {
  const { isLoaded, isSignedIn, user } = useUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "";
  const [interviewList, setInterviewList] = React.useState([]);

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn || !email) return;
    (async () => {
      const res = await fetch(
        `/api/interviews?email=${encodeURIComponent(email)}`,
        { cache: "no-store" }
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data?.ok) setInterviewList(data.rows || []);
    })();
  }, [isLoaded, isSignedIn, email]);

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList.map((interview) => (
          <InterviewItemCard
            key={interview.id ?? interview.mockId}
            interview={interview}
          />
        ))}
      </div>
    </div>
  );
}
