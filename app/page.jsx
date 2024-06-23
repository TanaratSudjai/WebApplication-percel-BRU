import React from "react";
import Link from "next/link";

function page() {
  return (
    <div className="h-[100vh] flex justify-center items-center w-full">
      <div className="text-2xl">Index ...</div>
      
      <div className="">
        <Link href="/owners">call api</Link>
      </div>
    </div>
  );
}

export default page;
