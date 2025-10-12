import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <article className="flex flex-col sm:flex-row justify-between items-center p-1 bg-slate-950 shadow-md">
      <div className="hidden sm:block sm:basis-1/2">
        <Image
          src="/Login.jpg"
          alt="signin"
          width={700}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="w-full sm:w-1/2 flex justify-center p-4">
        <SignUp />
      </div>
    </article>
  );
}
