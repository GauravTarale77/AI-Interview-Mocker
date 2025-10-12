"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () =>
    router.push(`/dashboard/interview/${interview?.mockId}`);
  const onFeedbackPress = () =>
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);

  const onDelete = async () => {
    const ok = window.confirm(
      "Sure to Delete this interview? This cannot be undone."
    );
    if (!ok) return;
    const res = await fetch(
      `/api/interview/${encodeURIComponent(interview?.mockId)}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data?.error || "Delete failed");
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-blue-700">{interview?.jobPosition}</h2>

      <div className="flex items-center justify-between">
        <h2 className="text-sm text-gray-600">
          {interview?.jobExperience} Year of Experience
        </h2>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete interview"
          title="Delete interview"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer [&_svg]:h-6 [&_svg]:w-6"
        >
          <Trash2 />
        </Button>
      </div>

      <h2 className="text-xs text-gray-400">
        Created At: {String(interview.createdAt)}
      </h2>

      <div className="flex justify-between mt-2 gap-3">
        <Button
          size="sm"
          variant="outline"
          className="w-full cursor-pointer"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button size="sm" className="w-full cursor-pointer" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}
