"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { useParams } from "next/navigation";
import Link from "next/link";

function Interview() {
  const params = useParams();
  const interviewId = params?.interviewId;
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInterview() {
      try {
        setLoading(true);
        const res = await fetch(`/api/interview/${interviewId}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to load interview");
        const data = await res.json();
        setInterviewData(data);
      } catch (e) {
        console.error(e);
        setError("Could not load interview");
      } finally {
        setLoading(false);
      }
    }
    if (interviewId) fetchInterview();
  }, [interviewId]);

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      {loading && <p className="mt-4">Loading interview...</p>}
      {error && !loading && <p className="mt-4 text-red-600">{error}</p>}

      {!loading && interviewData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col my-5 gap-5">
              <div className="p-5 rounded-lg border gap-5">
                <h2>
                  <strong>Job Role/Job Position:</strong>{" "}
                  {interviewData.jobPosition}
                </h2>
                <h2>
                  <strong>Job Description/Tech Stack:</strong>{" "}
                  {interviewData.jobDesc}
                </h2>
                <h2>
                  <strong>Years of Experience:</strong>{" "}
                  {interviewData.jobExperience}
                </h2>
              </div>

              <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                <h2 className="flex gap-2 items-center text-yellow-500">
                  <Lightbulb />
                  <strong>Information</strong>
                </h2>
                <h2 className="mt-3 text-yellow-500">
                  {process.env.NEXT_PUBLIC_INFORMATION}
                </h2>
              </div>
            </div>

            <div className="flex flex-col my-5 justify-center items-center">
              {webCamEnabled ? (
                <Webcam
                  onUserMedia={() => setWebCamEnabled(true)}
                  onUserMediaError={() => setWebCamEnabled(false)}
                  mirrored={true}
                  style={{
                    height: 300,
                    width: 300,
                  }}
                />
              ) : (
                <>
                  <WebcamIcon className="h-72 w-full my-7 p-20 bg-gray-200 rounded-lg border " />
                  <Button
                    variant="ghost"
                    onClick={() => setWebCamEnabled(true)}
                    className="cursor-pointer"
                  >
                    Enable Web Cam and Microphone
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end items-end mt-6">
            <Link href={"/dashboard/interview/" + interviewId + "/start"}>
              <Button className="cursor-pointer">Start Interview</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Interview;
