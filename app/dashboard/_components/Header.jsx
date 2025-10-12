"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();

  const nav = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/questions", label: "Questions" },
    { href: "/dashboard/upgrade", label: "Upgrade" },
    { href: "/dashboard/how", label: "How it Works?" },
    { href: "/dashboard/contact", label: "Contact" },
  ];

  return (
    <div className="p-3 flex justify-between items-center border shadow-md bg-purple-50">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 cursor-pointer"
      >
        <Image src={"/GT.png"} alt="logo" width={60} height={60} />
      </Link>

      <ul className="hidden md:flex gap-6">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`hover:text-indigo-700 hover:font-bold transition-all cursor-pointer ${
                path === item.href ? "text-indigo-700 font-bold" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
