// components/AuthWrapper.js

"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AuthIndex = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      if (session) {
        if (session.user.role === "staff") {
          Swal.fire({
            position: "top-mid",
            icon: "warning",
            title: "กรุณาออกจากระบบเพื่อความปลอดภัย!",
            showConfirmButton: false,
            timer: 2500,
          });
          router.push("/welcome");
        }
      }
    }
  }, [router, session, status]);

  // const Relofresh = async () => {
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       window.location.reload();
  //     }, 10000);

  //     return () => clearInterval(interval);
  //   }, []);
  //   return null;
  // };
  // Relofresh();

  return children;
};

export default AuthIndex;
