import React, { useState } from "react";

function addparcel() {
  const [parcelData, setPacelData] = useState('')
  




  return (
    <div className="h-full w-full flex flex-col font-[sans-serif] bg-gray-100">
      <div className="w-full bg-white">
        <h1>Add parcel</h1>
      </div>
      <div className="p-8 rounded-2xl bg-white shadow-xl w-[50vh] py-10">
        <h1 className="text-center text-2xl font-bold">รับพัสดุเข้าสู่ระบบ</h1>
        <form className="mt-6 space-y-4">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">
              รหัสพัสดุ
            </label>

            <div className="relative flex items-center">
              <input
                name="staff_name"
                type="text"
                required
                // value={formData.staff_name}
                // onChange={handleChange}
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="แสกนหรือกรอกรหัสพัสดุ"
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
              ชื่อพนักงานที่รับสินค้า
            </label>

            <div className="relative flex items-center">
              <select
                id="cars"
                name="carlist"
                form="carform"
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>

              {/* <input
                name="staff_name"
                type="text"
                required
                // value={formData.staff_name}
                // onChange={handleChange}
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="เลือกพนักงาน"
              /> */}
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
              ชื่อเจ้าของ
            </label>

            <div className="relative flex items-center">
              <input
                name="staff_name"
                type="text"
                required
                // value={formData.staff_name}
                // onChange={handleChange}
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="กรอกชื่อเจ้าของ"
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
              เบอร์เจ้าของ
            </label>

            <div className="relative flex items-center">
              <input
                name="staff_name"
                type="text"
                required
                // value={formData.staff_name}
                // onChange={handleChange}
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="กรอกเบอร์โทรเจ้าของ"
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

          <div className="!mt-8">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-400 hover:bg-blue-500 focus:outline-none"
            >
              เพิ่มพัสดุ
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default addparcel;
