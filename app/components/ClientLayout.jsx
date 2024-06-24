"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { Inter } from "next/font/google";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import SessionProvider from "./SessionProvider";
import { isAuthPage } from "../utils/checkPath"; //ตรวจสอบ routh ที่ต้องการแสดง nav และ sidebar
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
  return (
    <div className="font-sans w-[full]">
      {" "}
      {/*ให้แสดง navbar ใน routh ที่เลือก*/}
      <div className="">
        <SessionProvider session={session}>
          <div>{isAuthPage(pathname) && <Navbar session={session} />}</div>
          <div className="flex">
          {isAuthPage(pathname) && (
            <div>
              <Sidebar session={session} />
              {/*ให้แสดง sidebar ใน routh ที่เลือก*/}
            </div>
          )}

          {children}
          </div>
        </SessionProvider>
      </div>
    </div>
  );
}
