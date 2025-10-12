"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    async function load() {
      if (!interviewId) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/interview/${interviewId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load interview");
        const row = await res.json();

        const raw = row?.jsonMockResp;
        const normalize = (val) => {
          if (Array.isArray(val)) return val;
          if (val && typeof val === "object") return val;
          if (typeof val === "string") return JSON.parse(val);
          return [];
        };

        const parsed = normalize(raw);
        setInterviewData(row);
        setMockInterviewQuestion(parsed);
        setActiveQuestionIndex(0);
      } catch (e) {
        console.error(e);
        setError("Could not load interview");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [interviewId]);

  const next = () =>
    setActiveQuestionIndex((i) =>
      Math.min(i + 1, (mockInterviewQuestion?.length ?? 1) - 1)
    );
  const prev = () => setActiveQuestionIndex((i) => Math.max(i - 1, 0));

  if (loading) return <p className="mt-4">Loading interview...</p>;
  if (error) return <p className="mt-4 text-red-600">{error}</p>;
  if (!interviewData) return <p className="mt-4">No interview found.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion || []}
          activeQuestionIndex={activeQuestionIndex}
          onSelect={setActiveQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion || []}
          activeQuestionIndex={activeQuestionIndex}
          onSelect={setActiveQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6 -mt-6 md:-mt-10">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            className="cursor-pointer"
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            className="cursor-pointer"
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button className="cursor-pointer">End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
