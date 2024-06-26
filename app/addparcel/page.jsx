"use client";
import React, { useState, useEffect } from "react";

function addparcel() {
  const [ownData, setOwnData] = useState([]);
  const [staffData, setStaffData] = useState({ staff: [] });
  const [inputValue, setInputValue] = useState("");
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState({ id: "", phone: "" });
  const [selectedStaff, setSelectedStaff] = useState("");
  const [parcelCode, setParcelCode] = useState(""); // State for parcel code

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

    const fetchStaffData = async () => {
      try {
        const response = await fetch("/api/staff"); // Replace with your API endpoint
        const data = await response.json();
        setStaffData(data); // Ensure data is an array of staff objects
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchOwnData();
    fetchStaffData();
  }, []);

  useEffect(() => {
    if (Array.isArray(ownData)) {
      setFilteredOwners(
        ownData
          .filter((owner) =>
            owner.own_name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 4) // Limit to top 3
      );
    }
  }, [inputValue, ownData]);

  const handleSelectOwner = (id, name, phone) => {
    setInputValue(name);
    setSelectedOwner({ id, phone });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parcelData = {
      par_real_id: parcelCode, // Use the parcelCode state
      own_id: selectedOwner.id,
      staff_id: selectedStaff,
    };

    try {
      const response = await fetch("/api/parcel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parcelData),
      });

      if (response.ok) {
        console.log("Parcel data submitted successfully");
      } else {
        console.error("Failed to submit parcel data");
      }
    } catch (error) {
      console.error("Error submitting parcel data:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex justify-center w-full">
      <div class="container mx-auto">
        <h2 class="font-semibold text-xl text-gray-600">Responsive Form</h2>

        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <h1 className="text-center text-2xl font-bold">
            รับพัสดุเข้าสู่ระบบ
          </h1>
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label className="text-gray-800 text-sm mb-2 block">
                  รหัสพัสดุ
                </label>
                <div className="relative flex items-center">
                  <input
                    name="parcel_code"
                    type="text"
                    value={parcelCode}
                    onChange={(e) => setParcelCode(e.target.value)}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="แสกนหรือกรอกรหัสพัสดุ"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  พนักงาน
                </label>
                <select
                  id="staff"
                  name="staffList"
                  form="staffForm"
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                >
                  <option value="" disabled>
                    เลือกพนักงาน
                  </option>
                  {staffData.staff.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.staff_name}
                    </option>
                  ))}
                </select>
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
                  <ul className="flex flex-col bg-white border border-gray-300 w-full mt-1 rounded-md max-h-60 overflow-y-auto z-10">
                    {filteredOwners.map((owner) => (
                      <li
                        key={owner.own_id}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() =>
                          handleSelectOwner(
                            owner.own_id,
                            owner.own_name,
                            owner.own_phone
                          )
                        }
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
                    name="owner_phone"
                    type="text"
                    value={selectedOwner.phone}
                    readOnly
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="กรอกเบอร์โทรเจ้าของ"
                  />
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
      </div>
    </div>
  );
}

export default addparcel;
