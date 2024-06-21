"use client";
import React, { useState } from "react";
import Image from "next/image";

function MasterSignup() {
  const [formData, setFormData] = useState({ //<<<จัดการสถานะในส่วนประกอบที่ใช้งานได้  
    username: "", //formData: ตัวแปรนี้เก็บค่าอินพุตของฟอร์ม
    phone: "", //setFormData: ฟังก์ชันนี้จะอัพเดตสถานะ formData
  });
  
  const handleChange = (e) =>{ //อัพเดตสถานะ formData เมื่อพิมพ์ลงในช่อง input
    const {name ,value} = e.target;
    setFormData((prevState) =>({
        ...prevState,
        [name] : value,
    }));
  }

  const Submit = async (e) => {
    e.preventDefault(); //จัดการการส่งฟอร์มนะ
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), //แปลงอ็อบเจ็กต์ formData เป็นสตริง JSON และรวมไว้ในเนื้อหาคำขอ
      });
      const result = await response.json();
      console.log("Success:", result);

      setFormData({ //ทำฟอร์มให้ว่างงเมื่อ Success
        username: "",
        phone: "",
      });

      alert("Sign up successful!"); //แจ้งเตือน
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div>
      <div className="mx-auto mt-10 h-[100%] w-full flex flex-col items-center font-[sans-serif]">
        <Image src="/logoreal.png" width={300} height={300} alt="Logo" />

        <div className="p-8 rounded-2xl bg-white shadow-xl w-[50vh] py-10">
          <h1 className="text-center text-2xl font-bold">Sign up</h1>
          <p className="text-center text-sm font-plain">เพิ่มรายชื่อพนักงาน</p>
          <form className="mt-6 space-y-4" onSubmit={Submit}> 
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Username 
              </label>

              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter Username"
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

            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Phone number
              </label>

              <div className="relative flex items-center">
                <input
                  name="phone"
                  type="text"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>

            <div className="!mt-8">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MasterSignup;
