"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Inter } from "next/font/google";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { isAuthPage } from "../utils/checkPath"; // ตรวจสอบ route ที่ต้องการแสดง nav และ sidebar

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated" && session.user) {
    return (
      <div className={`font-sans w-full ${inter.className}`}>
        {isAuthPage(pathname) && <Navbar session={session} />}
        <div className="flex">
          {isAuthPage(pathname) && (
            <div>
              <Sidebar session={session} />
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }

  return null; // or a fallback UI
}
