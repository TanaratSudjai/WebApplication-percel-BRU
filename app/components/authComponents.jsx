// // components/AuthWrapper.js

"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthWrapper = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [router, status]);

  return children;
};

export default AuthWrapper;
