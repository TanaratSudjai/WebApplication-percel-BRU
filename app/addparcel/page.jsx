"use client";
import React, { useState, useEffect } from "react";

function addparcel() {
  const [staffData, setStaffData] = useState({ staff: [] });
  const [ownData, setOwnData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [parcelData, setPacelData] = useState({
    real_id: "",
    owner: "",
    staff: "",
  });

  useEffect(() => {
    // Fetch data from the database
    const fetchOwnData = async () => {
      try {
        const response = await fetch("/api/owner"); // Replace with your API endpoint
        const data = await response.json();
        setOwnData(data.owners); // Access the 'owners' array in the response
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    fetchOwnData();
  }, []);

  useEffect(() => {
    if (Array.isArray(ownData)) {
      setFilteredOwners(
        ownData
          .filter((owner) =>
            owner.own_name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 3) // Limit to top 3
      );
    }
  }, [inputValue, ownData]);

  const handleSelect = (name) => {
    setInputValue(name);
    setFilteredOwners([]);
    setDropdownVisible(false);
  };

  const handleInputFocus = () => {
    setDropdownVisible(true);
  };

  const handleInputBlur = () => {
    // Delay hiding to allow click event on dropdown items
    setTimeout(() => setDropdownVisible(false), 100);
  };

  useEffect(() => {
    // Fetch data from the database
    const fetchStaffData = async () => {
      try {
        const response = await fetch('/api/staff'); // Replace with your API endpoint
        const data = await response.json();
        setStaffData(data); // Ensure data is an array of staff objects
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

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
                id="staff"
                name="staffList"
                form="staffForm"
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              >
                {staffData.staff &&
                  staffData.staff.map((staff) => (
                    <option key={staff.id} value={staff.id} default={null}>
                      {staff.staff_name}
                    </option>
                  ))}
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
                name="own_name"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
                className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="กรอกชื่อเจ้าของ"
              />
            </div>
            {isDropdownVisible && filteredOwners.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md max-h-60 overflow-y-auto z-10">
                {filteredOwners.map((owner) => (
                  <li
                    key={owner.own_id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onMouseDown={() => handleSelect(owner.own_name)}
                  >
                    {owner.own_name}
                  </li>
                ))}
              </ul>
            )}
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
