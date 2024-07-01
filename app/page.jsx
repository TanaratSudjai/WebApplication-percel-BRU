"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
      } else {
        window.location.href = "/welcome";
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="mx-auto mt-10 h-[80vh] w-full flex flex-col items-center justify-center font-[sans-serif]">
      <div className="p-8 rounded-2xl bg-white shadow-xl w-[50vh] py-10 ">
        <div className="flex justify-center">
          <Image src="/realogo.png" width={300} height={500} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="mb-4">
            <label className="text-gray-800 text-sm mb-2 block">อีเมล</label>
            <div className="relative flex items-center">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" // Added border
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
            <label className="text-gray-800 text-sm mb-2 block">รหัสผ่าน</label>
            <div className="relative flex items-center">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" // Added border
                placeholder="กรุณากรอกรหัสผ่านเพื่อเข้าสู่ระบบ"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#60d0ac] hover:bg-[#469e80] text-white py-3 rounded mb-4"
          >
            เข้าสู่ระบบพนักงาน
          </button>{" "}
          <div className="w-full text-center">
            <Link href="/ownerLogin">
              <span className="text-blue-400 text-sm">
                เข้าสู่ระบบสำหรับเจ้าของพัสดุ
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
