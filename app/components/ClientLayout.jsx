"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import SessionProvider from "./SessionProvider";
import { isAuthPage } from "../utils/checkPath";//ตรวจสอบ routh ที่ต้องการแสดง nav และ sidebar
const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ session, children }) {
  const pathname = usePathname();

  return (
    <div className="m-2 font-sans w-[full]">
      {isAuthPage(pathname) && <Navbar session={session} />} {/*ให้แสดง navbar ใน routh ที่เลือก*/ }
      <div className="flex gap-4 mt-3">
        {isAuthPage(pathname) && ( 
          <div>
            <Sidebar session={session} /> {/*ให้แสดง sidebar ใน routh ที่เลือก*/ }
          </div>
        )}
          <SessionProvider session={session}>{children}</SessionProvider>
      </div>
    </div>
  );

}
