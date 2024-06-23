"use client";

import React,  { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const { data: session, status } = useSession();
  // console.log("session", session);
  // console.log("status", status);
  const router = useRouter();
  useEffect(()=>{
    if(status === 'authenticated'){
      router.push('/');
    }
  },[router, status])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === "authenticated" && session.user) {
    return (
      <div>
        Welcome, {session.user.name}
        <button class="w-[100px] p-2 rounded-md" onClick={()=> signOut({callbackUrl:'/'})}>LogOut</button>
      </div>
    )
  }
}

export default page;
