"use client";

import React from "react";
import { useSession } from "next-auth/react";

function page() {
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === "authenticated" && session.user) {
    return (
      <div>
        Welcome, {session.user.name}
      </div>
    )
  }
}

export default page;
