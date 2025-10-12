"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Hero() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
      </div>

      <div className="flex flex-col items-center mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-gray-900 mb-3">
            Master Your Interviews
            <br />
            Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-600 to-purple-400 font-semibold">
              Confidence Faster
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-700 sm:text-xl">
            Practice with role-specific questions, real-time AI feedback, and
            clear action steps to improve with every attempt.
          </p>

          <div className="mt-8 flex justify-center gap-4 sm:mt-12">
            {user ? (
              <button
                className="inline-block rounded border border-indigo-500 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                className="inline-block rounded border border-indigo-500 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 cursor-pointer"
                onClick={() => router.push("/sign-in")}
              >
                Get Started
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div className="w-full">
            <Image
              src="/dashboard1.png"
              alt="Interview dashboard overview"
              width={1000}
              height={700}
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="w-full h-auto rounded-xl border"
            />
          </div>

          <div className="w-full">
            <Image
              src="/dashboard.png"
              alt="Interview session preview"
              width={1000}
              height={700}
              loading="lazy"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="w-full h-auto rounded-xl border"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
