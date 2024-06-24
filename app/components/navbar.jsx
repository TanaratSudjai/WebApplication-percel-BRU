"use client"
import React, {useEffect} from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


function navbar() {
  const { data: session , status } = useSession();
  
  return (
    <div className="h-[15%] w-full sticky bg-blue-500">
      <div className="w-full items-center flex justify-between p-3">
        <h1 className="text-center text-2xl font-bold text-white ml-[100px]">
          Parcel
        </h1>

        {session ? (
        <div>
           Welcome, {session.user.name}
          <button className="w-[100px] p-2 rounded-md" onClick={() => signOut({ callbackUrl: '/' })}>
            LogOut
          </button>
        </div>
      ) : (
        <div>ไม่อณุญาติใช้งาน</div>
      )}

      </div>
    </div>
  );
}

export default navbar;
