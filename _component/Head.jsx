"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Head = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 flex justify-between items-center border shadow-md bg-purple-50">
      <div className="flex justify-between items-center ">
        <Image src={"/GT.png"} alt="logo" width={60} height={60} />
        <span className="font-serif text-2xl text-slate-700">
          AI Interview Mocker
        </span>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>
          <Button className="cursor-pointer">Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Head;
