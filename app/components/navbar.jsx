"use client"
import React, {useEffect} from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


function navbar() {
  const { data: session , status } = useSession();
  
  return (
    <div className="h-[15%] w-full sticky  ">
      <div className="w-full items-center flex justify-between p-3 ml-5">
          <Image src="/realogo.png" width={200} height={200} alt=""/>
      </div>
      <div>
       <hr />
      </div>
    </div>
  );
}

export default navbar;
