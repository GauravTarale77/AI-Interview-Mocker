"use client";

import React from "react";
import InterviewItemCard from "./InterviewItemCard";

export default function InterviewListClient({ interviewList }) {
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
