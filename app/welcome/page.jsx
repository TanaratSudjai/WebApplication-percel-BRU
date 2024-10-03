// "use client";

import React from "react";
import AuthWrapper from "../components/authComponents";
import Image from "next/image";

function Page() {
  return (
    <AuthWrapper>
      <div className="container mx-auto p-4">
        <div className="w-full h-screen flex justify-center items-center">
          <div className="max-w-md w-full">
            <div className="flex justify-center mb-[150px]">
              <Image src="/bru.png" width={300} height={300} alt="Logo" />
            </div>
            {/* <div className="border border-gray-200 bg-white p-6 rounded-lg shadow-lg">
            </div> */}
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Page;
