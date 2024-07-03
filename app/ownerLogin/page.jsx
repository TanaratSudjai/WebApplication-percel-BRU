"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

const OwnerLoginPage = () => {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("owner-login", {
        redirect: false,
        phone,
      });

      if (result.error) {
        console.error(result.error);
        Swal.fire({
          title: "ไม่พบหมายเลขนี้",
          text: "กรุณาเช็คความถูกต้องก่อนรับสินค้า",
          icon: "question",
          confirmButtonColor: "#60d0ac",
          confirmButtonText: "รับทราบ!"
        });
      } else {
        window.location.href = "/ownerManage";
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="mx-auto mt-4 sm:mt-10 min-h-screen w-full px-4 flex flex-col items-center justify-center font-sans bg-gray-100">
      <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="/realogo.png"
            width={200}
            height={333}
            alt="Logo"
            className="w-48 sm:w-64"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="phone" className="text-gray-800 text-sm mb-2 block">
              เบอร์โทรศัพท์
            </label>
            <div className="relative flex items-center">
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="กรุณากรอกเบอร์โทรศัพท์เพื่อเข้าสู่ระบบ"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-4 h-4 absolute right-4"
                viewBox="0 0 24 24"
              >
                <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,0,8.3,8.487a9.019,9.019,0,0,0,7.215,7.215,3.877,3.877,0,0,0,1.46-.482,2.094,2.094,0,0,1,2.328.445Z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#60d0ac] hover:bg-[#469e80] text-white py-3 rounded-md mb-4 transition duration-300 ease-in-out"
          >
            เข้าสู่ระบบด้วยเบอร์มือถือ
          </button>
          <div className="w-full text-center">
            <Link href="/">
              <span className="text-blue-400 text-sm hover:underline">
                เข้าสู่ระบบสำหรับพนักงาน
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerLoginPage;
