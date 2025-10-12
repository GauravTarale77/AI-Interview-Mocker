"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FeedbackClient({
  interviewId,
  feedbackList,
  overallOutOf10,
}) {
  const router = useRouter();

  const isEmpty = !feedbackList || feedbackList.length === 0;

  return (
    <div className="p-10">
      {isEmpty ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-blue-800 text-lg my-3">
            Your overall interview rating: {overallOutOf10}/10
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, your answer, and
            feedback for improvement.
          </h2>

          <div className="mt-6 max-h-[32rem] overflow-auto">
            {feedbackList.map((item) => (
              <Collapsible
                key={item.id ?? `${item.mockIdRef}-${item.question}`}
              >
                <CollapsibleTrigger className="p-2 bg-gray-200 rounded-lg text-left flex justify-between gap-7 w-full cursor-pointer mt-4">
                  <span className="font-medium">{item.question}</span>
                  <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 mt-2">
                    <h2 className="text-red-600 p-2 border rounded-lg">
                      <strong>Rating:</strong> {item.rating ?? "-"}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-600">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </>
      )}

      <div className="mt-6">
        <Button
          onClick={() => router.replace("/dashboard")}
          className="cursor-pointer"
        >
          Home
        </Button>
      </div>
    </div>
  );
}
