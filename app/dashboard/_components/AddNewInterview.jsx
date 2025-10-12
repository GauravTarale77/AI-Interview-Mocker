"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import moment from "moment";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const count =
        Number(process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT) || 5;

      const gen = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobPosition,
          jobDesc,
          years: Number(jobExperience),
          count,
        }),
      });
      if (!gen.ok) throw new Error("Generation failed");
      const data = await gen.json();
      setJsonResponse(data);

      const createdBy = user?.primaryEmailAddress?.emailAddress || "unknown";
      const createdAt = moment().format("DD-MM-yyyy");

      const save = await fetch("/api/save-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonMockResp: data,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy,
          createdAt,
        }),
      });
      if (!save.ok) throw new Error("Save failed");
      const saved = await save.json();
      const mockId = saved?.inserted?.[0]?.mockId;

      if (mockId) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${mockId}`);
      } else {
        throw new Error("Missing mockId in save response");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="p-10 border rounded-lg border-gray-300 bg-gray-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Job Interviewing
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <form id="newInterviewForm" onSubmit={onSubmit}>
            <h2>
              Add Details about your job position, your skills, and years of
              experience
            </h2>

            <div className="mt-7 my-3">
              <label htmlFor="jobPosition">Job Role/Job Position</label>
              <Input
                id="jobPosition"
                placeholder="Ex. Full Stack Developer"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="my-3">
              <label htmlFor="jobDesc">
                Job Description / Tech Stack (In Short)
              </label>
              <Textarea
                id="jobDesc"
                placeholder="Ex. React, Angular, Node.js, MySQL etc."
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="my-3">
              <label htmlFor="jobExperience">Years of Experience</label>
              <Input
                id="jobExperience"
                placeholder="Ex. 2, 3, 5"
                type="number"
                min={0}
                max={50}
                required
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
                disabled={loading}
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={loading}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewInterview;
