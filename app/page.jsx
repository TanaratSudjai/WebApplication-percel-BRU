"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("staff-login", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        console.error(result.error);
        Swal.fire({
          title: "รหัสผ่านหรืออีเมลไม่ถูกต้อง",
          text: "กรุณาเช็คความถูกต้องก่อนเข้าสู่ระบบ",
          icon: "question",
          confirmButtonColor: "#60d0ac",
          confirmButtonText: "รับทราบ!"
        });
      } else {
        window.location.href = "/welcome";
      }
    } catch (error) {
      console.log("error", error);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-xl w-full max-w-md">
        <div className="flex justify-center">
          <Image
            src="/realogo.png"
            width={200}
            height={333}
            alt="Logo"
            className="w-48 sm:w-64"
          />
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-800 text-sm mb-2 block">
              อีเมล
            </label>
            <div className="relative flex items-center">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="กรุณากรอกอีเมลเพื่อเข้าสู่ระบบ"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-4 h-4 absolute right-4"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-gray-800 text-sm mb-2 block"
            >
              รหัสผ่าน
            </label>
            <div className="relative flex items-center">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="กรุณากรอกรหัสผ่านเพื่อเข้าสู่ระบบ"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#60d0ac] hover:bg-[#469e80] text-white py-3 rounded-md mb-4 transition duration-300 ease-in-out"
          >
            เข้าสู่ระบบพนักงาน
          </button>
          <div className="w-full text-center">
            <Link href="/ownerLogin">
              <span className="text-blue-400 text-sm hover:underline">
                เข้าสู่ระบบสำหรับเจ้าของพัสดุ
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
