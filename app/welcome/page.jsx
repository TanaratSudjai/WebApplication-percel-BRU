// "use client";

import React from "react";
import AuthWrapper from "../components/authComponents";
import Image from "next/image";

function Page() {
  return (
    <AuthWrapper>
      <div className="container border-spacing-1 p-4 w-full h-[100vh] overflow-hidden">
          <div className="h-[80vh] flex justify-center items-center">
            <Image src="/realogo.png" width={500} height={500} />
          </div>
      </div>
    </AuthWrapper>
  );
}

export default Page;
