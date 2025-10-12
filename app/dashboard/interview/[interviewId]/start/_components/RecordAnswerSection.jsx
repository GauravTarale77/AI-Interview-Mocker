"use client";
import React from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function useBrowserSpeech() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [results, setResults] = React.useState([]);
  const [interim, setInterim] = React.useState("");
  const recRef = React.useRef(null);
  const startingRef = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError(new Error("Web Speech API not available"));
      return;
    }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.onstart = () => {
      startingRef.current = false;
      setIsRecording(true);
    };
    rec.onend = () => {
      startingRef.current = false;
      setIsRecording(false);
    };
    rec.onresult = (e) => {
      const final = [];
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final.push({ transcript: t, ts: Date.now() });
        else interimText += t;
      }
      if (final.length) setResults((prev) => [...prev, ...final]);
      setInterim(interimText);
    };
    rec.onerror = (e) => setError(e);
    recRef.current = rec;

    return () => {
      try {
        recRef.current?.stop();
      } catch {}
      setIsRecording(false);
    };
  }, []);

  const start = React.useCallback(() => {
    if (startingRef.current || isRecording) return;
    try {
      startingRef.current = true;
      recRef.current?.start();
    } catch (e) {
      startingRef.current = false;
      if (e?.name !== "InvalidStateError") setError(e);
    }
  }, [isRecording]);

  const stop = React.useCallback(() => {
    try {
      recRef.current?.stop();
    } catch (e) {
      setError(e);
    }
  }, []);

  const abort = React.useCallback(() => {
    try {
      recRef.current?.abort?.();
    } catch (e) {
      setError(e);
    }
  }, []);

  return {
    isRecording,
    error,
    results,
    interim,
    start,
    stop,
    abort,
    setResults,
  };
}

function RecordAnswerSection({
  mockInterviewQuestion = [],
  activeQuestionIndex = 0,
  onSelect,
  interviewData,
}) {
  const MIN_LEN = 10;
  const { user } = useUser();
  const [userAnswer, setUserAnswer] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [cameraOn, setCameraOn] = React.useState(false);

  const {
    error,
    interim,
    isRecording,
    results,
    start,
    stop,
    abort,
    setResults,
  } = useBrowserSpeech();

  const prevIndexRef = React.useRef(activeQuestionIndex);
  const isRecordingRef = React.useRef(false);
  React.useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  React.useEffect(() => {
    if (!results?.length) return;
    setUserAnswer((prev) => {
      const add = results.map((r) => r?.transcript || "").join(" ");
      return (prev + " " + add).trim();
    });
  }, [results]);

  React.useEffect(() => {
    if (prevIndexRef.current !== activeQuestionIndex) {
      if (isRecordingRef.current) {
        stop();
        setUserAnswer("");
        setResults([]);
        toast("Recording stopped because the question changed");
      }
      prevIndexRef.current = activeQuestionIndex;
    }
  }, [activeQuestionIndex, stop, setResults]);

  const StartStopRecording = () => {
    if (isRecording) {
      stop();
    } else {
      setUserAnswer("");
      setResults([]);
      start();
    }
  };

  const UpdateUserAnswer = async () => {
    const q = mockInterviewQuestion[activeQuestionIndex];
    if (!interviewData?.mockId) {
      toast("Missing interview id");
      return;
    }
    if (!q?.question) {
      toast("Missing question");
      return;
    }
    if (userAnswer.trim().length < MIN_LEN) {
      toast("Your answer is too short, record again");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mockIdRef: interviewData.mockId,
          question: q.question,
          correctAns: q.answer ?? null,
          userAns: userAnswer,
          userEmail: user?.primaryEmailAddress?.emailAddress ?? null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Save failed");
      }
      const data = await res.json();
      if (data?.ok) {
        toast("User answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      } else {
        toast("Could not record answer");
      }
    } catch (e) {
      console.error(e);
      toast(e.message || "Error while saving answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-full max-w-2xl h-72 rounded-lg p-5 bg-gray-200 flex items-center justify-center overflow-hidden">
        {!cameraOn ? (
          <Image
            src="/WebCam.png"
            alt="Webcam placeholder"
            width={240}
            height={240}
            className="mx-auto"
            priority
          />
        ) : (
          <Webcam
            mirrored
            audio={false}
            className="w-full h-full object-cover"
            videoConstraints={{ facingMode: "user" }}
            onUserMedia={() => {}}
            onUserMediaError={() => {}}
          />
        )}
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Camera is optional; turn it on to see yourself while answering.{" "}
      </p>

      <div className="flex gap-3 my-5">
        <Button
          variant="secondary"
          className="cursor-pointer"
          disabled={loading}
          onClick={() => setCameraOn((v) => !v)}
        >
          {cameraOn ? "Turn off camera" : "Turn on camera"}
        </Button>

        <Button
          disabled={loading}
          variant="outline"
          className="cursor-pointer"
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <span className="text-red-600 flex gap-2 items-center">
              <Mic /> Stop Recording
            </span>
          ) : (
            <span className="flex gap-2 items-center text-blue-900">
              <Mic /> Record Answer
            </span>
          )}
        </Button>

        <Button
          disabled={loading || userAnswer.trim().length < MIN_LEN}
          onClick={UpdateUserAnswer}
          className="cursor-pointer"
        >
          Save Answer
        </Button>
      </div>

      {!!interim && (
        <p className="text-sm text-gray-600 max-w-2xl px-4 text-center">
          {interim}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 max-w-2xl px-4 text-center">
          Mic error: {String(error)}
        </p>
      )}
    </div>
  );
}

export default RecordAnswerSection;
